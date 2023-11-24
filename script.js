document.addEventListener('DOMContentLoaded', function () {
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

    scanner.addListener('scan', function (content) {
        alert('Scanned: ' + content);
    });

    const cameraSelect = document.getElementById('camera-select');

    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            cameras.forEach(function (camera, index) {
                const option = document.createElement('option');
                option.value = index;
                option.text = camera.name || `Camera ${index + 1}`;
                cameraSelect.add(option);
            });

            scanner.start(cameras[0]);

            cameraSelect.addEventListener('change', function () {
                scanner.stop();
                scanner.start(cameras[cameraSelect.value]);
            });
        } else {
            console.error('No cameras found.');
        }
    }).catch(function (e) {
        console.error(e);
    });
});
