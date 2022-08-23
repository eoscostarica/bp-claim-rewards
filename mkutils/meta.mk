-include .env

VERSION ?= $(shell git rev-parse --short HEAD)
CURRENT_BRANCH ?= $(shell git rev-parse --abbrev-ref HEAD)

IMAGE_NAME_CLAIM=claim-rewards

DOCKER_REGISTRY=eoscostarica506

MAKE_ENV += DOCKER_REGISTRY VERSION IMAGE_NAME_CLAIM

SHELL_EXPORT := $(foreach v,$(MAKE_ENV),$(v)='$($(v))')

ifneq ("$(wildcard .env)", "")
	export $(shell sed 's/=.*//' .env)
endif