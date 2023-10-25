export default class VideoProcessor {
  mp4Decoder(encoderConfig, stream) {

  }

  async start({file, encoderConfig}) {
    const stream = file.stream()
    const fileName = file.name.split('/').pop().replace('.mp4', '')
    debugger
  }
}