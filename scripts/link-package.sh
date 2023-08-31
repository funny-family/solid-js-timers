#!/bin/bash

pnpm build
pnpm pack
cd ./playground
pnpm i
