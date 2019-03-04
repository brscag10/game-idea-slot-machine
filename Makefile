PORT=8080

setup:
	brew bundle
	yarn install
launch:
	if [ ! -d "./node_modules" ]; then
		echo "dependencies not installed - please run `make setup`"
		exit 1
	fi

	docker run $(docker build . --quiet) -rit -p $(PORT):$(PORT)

	open http://localhost:8080
deploy:
	# update image in gcloud
	# update image in cluster