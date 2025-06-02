# performanceTestingDemo

## Doc k6:
https://grafana.com/docs/k6/next/

## Obtener k6:
https://grafana.com/docs/k6/latest/set-up/install-k6/

## Instalar k6 con docker:

`docker pull grafana/k6`

## Levantar api:
`node index.js`

## Url localhost en docker:
`host.docker.internal`

## Ejecutar tests: 

### En powershell:
`docker run --rm -i -v "rutaAbsolutaALaCarpetaScripts/scripts:/scripts" grafana/k6 run /scripts/test1.js`

### Esto porque estamos con docker, sino es `k6 run test.js`

Ejemplo:
`docker run --rm -i -v "C:/Prog/ORT/7mo/ISA2/DemoPresentacion/performanceTestingDemo/scripts:/scripts" grafana/k6 run /scripts/TestSmoke.js`

## Análisis de resultados:
`https://grafana.com/docs/k6/latest/examples/get-started-with-k6/analyze-results/`

## Métricas:
`https://grafana.com/docs/k6/next/using-k6/metrics/`