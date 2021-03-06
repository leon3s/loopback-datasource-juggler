// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-datasource-juggler
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';

var should = require('./init.js');

var jdb = require('../');
var DataSource = jdb.DataSource;

var ds, Item, Variant;
describe('Datasource-specific field types for foreign keys', function() {
  before(function() {
    ds = new DataSource('memory');
    Item = ds.define('Item', {
      myProp: {
        id: true,
        type: 'string',
        memory: {
          dataType: 'string',
        },
      },
    });
    Variant = ds.define('Variant', {}, {
      relations: {
        item: {
          type: 'belongsTo',
          as: 'item',
          model: 'Item',
          foreignKey: 'myProp',
        },
      },
    });
  });

  it('should create foreign key with database-specific field type', function(done) {
    var VariantDefinition = ds.getModelDefinition('Variant');
    should.exist(VariantDefinition);
    should.exist(VariantDefinition.properties.myProp.memory);
    should.exist(VariantDefinition.properties.myProp.memory.dataType);
    VariantDefinition.properties.myProp.memory.dataType.should.be.equal('string');
    done();
  });
})
;
