# performanceTestingDemo

Obtener k6:
https://grafana.com/docs/k6/latest/set-up/install-k6/



Con docker:

docker pull grafana/k6

docker run grafana/k6 run scripts/test.js



`host.docker.internal`

`docker run --rm -i -v "rutaAbsolutaALaCarpetaScripts/scripts:/scripts" grafana/k6 run /scripts/test1.js`