# Instructions
Run the following command and visit localhost:3000 in your browser.
```
docker load < captrivia-be-arm64.tar && docker-compose up
```
If you're having trouble resolving source metadata for `node:latest`, try pulling the image directly.
```
docker pull node:latest
```
If you face a permission issue, try using `sudo`.
```
sudo docker load < captrivia-be-arm64.tar && docker-compose up
```