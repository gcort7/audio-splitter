# Audio Splitter

Audio splitter is a great tool that allows one to separate a piece of music into its various musical instruments including vocals.

Audio Splitter is using spleeter library which is a state of the art AI library, check this out https://github.com/deezer/spleeter.
Spleeter uses machine learning models to separate the musical track of each instrument based on its frequency.


## Run Locally

Clone the project

```bash
  git clone https://github.com/gcort7/audio-splitter.git
```

Go to the project directory

```bash
  cd audio-splitter
```

This project runs in a [Docker][] container. All you need is to install Docker in your computer and then execute the following command:

```bash
  docker-compose up
```

[Docker]: https://www.docker.com/get-started


Once the container is up go to http://localhost:3000/

## Authors

- [@gcort7](https://www.github.com/gcort7)