#!/usr/bin/env node
const NODE_ENV = process.env.NODE_ENV = 'development';
console.log(typeof (NODE_ENV));
if (NODE_ENV === 'development') {
  console.log('ok');
} else {
  console.log('not ok');
}
