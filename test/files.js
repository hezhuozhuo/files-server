const request = require('supertest');
const assert = require('assert');
const express = require('express');
var sqlite = require('../src/sqlite');
//import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');
var app = require("../app")

describe('GET /files/list', function() {
  it('responds with json', function() {
    return request(app)
      .get('/files/list')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
          assert(response.body.code)
          assert.equal(response.body.code,200)
      })
  });
});

describe('DELETE /files/delete', function() {
    var uuid = uuidv4()
    sqlite.db.run("INSERT INTO video (id) VALUES ($id)",{
        $id: uuid,
    });
    it('responds with json', function() {
      request(app)
        .delete('/files/delete')
        .send({id: uuid})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            assert(response.body.code)
            assert.equal(response.body.code,200)
        })
    });
  });