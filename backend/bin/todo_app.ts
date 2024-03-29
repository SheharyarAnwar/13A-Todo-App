#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TodoAppStack } from '../lib/todo_app-stack';

const app = new cdk.App();
new TodoAppStack(app, 'TodoAppStack');
