FROM python:3.8

RUN echo "deb https://deb.nodesource.com/node_14.x buster main" > /etc/apt/sources.list.d/nodesource.list && \
    wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    apt-get update && \
    apt-get install -yqq nodejs=$(apt-cache show nodejs|grep Version|grep nodesource|cut -c 10-) && \
    apt-mark hold nodejs && \
    rm -rf /var/lib/apt/lists/*


RUN curl -sSLo /tmp/miniconda.sh https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh && \
    bash /tmp/miniconda.sh -b -p /opt/miniconda && \
    rm -rf /tmp/miniconda.sh

ENV PATH "/opt/miniconda/bin:${PATH}"

WORKDIR /usr/src/app/

RUN conda install -c conda-forge ffmpeg libsndfile
RUN conda install python=3.8
RUN pip install spleeter

RUN curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
RUN chmod a+rx /usr/local/bin/youtube-dl

COPY package.json package-lock.json /usr/src/app/

RUN npm ci 

COPY . /usr/src/app/

EXPOSE 3000 

CMD ["node", "server.js"]
