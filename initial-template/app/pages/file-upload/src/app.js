import Clock from './deps/clock.js';
import View from './view.js';

const view = new View()
const clock = new Clock()
const worker = new Worker('./src/worker/worker.js', {
    type: 'module'
});

worker.onmessage = ({ data }) => {
    if (data.status !== 'done') return;
    clock.stop()
    view.updatedElapseTime(`Process took ${took.replace('ago', '')}`)
}

let took = ''



view.configureOnFileChange((file) => {
    worker.postMessage({
        file
    })

    clock.start((time) => {
        took = time;
        view.updatedElapseTime(`Process started ${time}`)
      })

    setTimeout(() => {
    clock.stop()
    view.updatedElapseTime(`Process took ${took.replace('ago', '')}`)
    }, 5000)
})

async function fakeFetch() {
    const filePath = '/videos/frag_bunny.mp4';
    const response = await fetch(filePath);
    // trás o tamanho do arquivo
    // response.headers.get('content-length')

    const file = new File([await response.blob()], filePath, { type: 'video/mp4', lastModified: Date.now() });
    const event = new Event('change')
    Reflect.defineProperty(
        event,
        'target',
        {value: {files: [file]}}
    )
    document.getElementById('fileUpload').dispatchEvent(event)
}

fakeFetch()