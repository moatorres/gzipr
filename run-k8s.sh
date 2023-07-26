#!/bin/bash

# docker image name
export IMAGE_NAME=ghcr.io/moatorres/gzip-uploader
# docker stable tag
export IMAGE_TAG=latest

# build the docker image with buildx
docker buildx build -t "${IMAGE_NAME}:${IMAGE_TAG}" -f apps/gzipr/Dockerfile .

# k8s manifest
export MANIFEST=apps/gzipr/deploy/gzip-uploader.dev.yaml

# create the k8s deployment
kubectl apply -f "${MANIFEST}"

# uncomment the following lines to port-forward the service
# kubectl port-forward -n dev services/gzip-uploader 3000:80

# cleanup resources on termination
function cleanup() {
  kubectl delete -f "${MANIFEST}"
}

# trap termination signals
trap cleanup EXIT INT TERM

# keep the container running
tail -f /dev/null
