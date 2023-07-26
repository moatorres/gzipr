IMAGE_NAME=ghcr.io/moatorres/gzipr
IMAGE_TAG=latest

build:
	docker buildx build -t $(IMAGE_NAME):$(IMAGE_TAG) -f apps/gzipr/Dockerfile . --no-cache

build-push:
	docker buildx build -t $(IMAGE_NAME):$(IMAGE_TAG) --push -f apps/gzipr/Dockerfile .

run:
	docker run --name gzipr -it -d -p 3001:3000 --env-file apps/gzipr/.env $(IMAGE_NAME):$(IMAGE_TAG)

start: 
	docker start gzipr

stop:
	docker stop gzipr

remove:
	docker rm gzipr