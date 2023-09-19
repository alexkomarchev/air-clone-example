#!/bin/bash

source /root/air-autodeploy/air-frontend/.env
docker compose -f /root/air-autodeploy/air-frontend/docker-compose.yml pull
docker compose -f /root/air-autodeploy/air-frontend/docker-compose.yml up -d
