#!/bin/bash
mysqladmin ping -h db_server -u app -p"${MYSQL_ROOT_PASSWORD}"
