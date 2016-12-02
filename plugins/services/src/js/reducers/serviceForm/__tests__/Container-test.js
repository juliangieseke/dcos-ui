const Container = require('../Container');
const Batch = require('../../../../../../../src/js/structs/Batch');
const Transaction = require('../../../../../../../src/js/structs/Transaction');
const {ADD_ITEM, SET} = require('../../../../../../../src/js/constants/TransactionTypes');
const {type: {BRIDGE, HOST, USER}} = require('../../../../../../../src/js/constants/Networking');

describe('Container', function () {

  describe('#JSONReducer', function () {

    it('should return a null container as default object', function () {
      let batch = new Batch();

      expect(batch.reduce(Container.JSONReducer.bind({}), {}))
        .toEqual(null);
    });

    it('switches container name along with type', function () {
      let batch = new Batch();
      batch = batch.add(new Transaction(['container', 'type'], 'DOCKER', SET));
      batch = batch.add(
          new Transaction(['container', 'docker', 'image'], 'foo', SET)
      );

      expect(batch.reduce(Container.JSONReducer.bind({}), {}))
        .toEqual({type: 'DOCKER', docker: {image: 'foo'}});
    });

    it('creates new container info when there is nothing', function () {
      let batch = new Batch();
      batch = batch.add(
          new Transaction(['container', 'docker', 'image'], 'foo', SET)
      );
      batch = batch.add(new Transaction(['container', 'type'], 'DOCKER', SET));

      expect(batch.reduce(
        Container.JSONReducer.bind({}),
        {}
      )).toEqual({type: 'DOCKER', docker: {image: 'foo'}});
    });

    it('keeps top-level container info with type switch', function () {
      let batch = new Batch();
      batch = batch.add(
          new Transaction(['container', 'docker', 'image'], 'foo', SET)
      );
      batch = batch.add(new Transaction(['container', 'type'], 'MESOS', SET));

      expect(batch.reduce(
        Container.JSONReducer.bind({}),
        {}
      )).toEqual({type: 'MESOS', docker: {image: 'foo'}});
    });

    it('sets privileged correctly', function () {
      let batch = new Batch();
      batch = batch.add(
        new Transaction(['container', 'docker', 'privileged'], true, SET)
      );
      batch = batch.add(
          new Transaction(['container', 'docker', 'image'], 'foo', SET)
      );

      expect(batch.reduce(
        Container.JSONReducer.bind({}),
        {}
      )).toEqual({docker: {image: 'foo', privileged: true}});
    });

    it('sets privileged correctly to false', function () {
      let batch = new Batch();
      batch = batch.add(
          new Transaction(['container', 'docker', 'image'], 'foo', SET)
      );
      batch = batch.add(
        new Transaction(['container', 'docker', 'privileged'], false, SET)
      );

      expect(batch.reduce(
        Container.JSONReducer.bind({}),
        {}
      )).toEqual({docker: {image: 'foo', privileged: false}});
    });

    it('doesn\'t set privileged if path doesn\'t match type', function () {
      let batch = new Batch();
      batch = batch.add(
          new Transaction(['container', 'docker', 'image'], 'foo', SET)
      );
      batch = batch.add(
        new Transaction(['container', 'foo', 'privileged'], true, SET)
      );

      expect(batch.reduce(
        Container.JSONReducer.bind({}),
        {}
      )).toEqual({docker: {image: 'foo'}});
    });

    it('sets forcePullImage correctly', function () {
      let batch = new Batch();
      batch = batch.add(
          new Transaction(['container', 'docker', 'image'], 'foo', SET)
      );
      batch = batch.add(
        new Transaction(['container', 'docker', 'forcePullImage'], true, SET)
      );

      expect(batch.reduce(
        Container.JSONReducer.bind({}),
        {}
      )).toEqual({docker: {image: 'foo', forcePullImage: true}});
    });

    it('sets forcePullImage correctly to false', function () {
      let batch = new Batch();
      batch = batch.add(
        new Transaction(['container', 'docker', 'forcePullImage'], false, SET)
      );
      batch = batch.add(
        new Transaction(['container', 'docker', 'image'], 'foo', SET)
      );

      expect(batch.reduce(
        Container.JSONReducer.bind({}),
        {}
      )).toEqual({docker: {image: 'foo', forcePullImage: false}});
    });

    it('doesn\'t set forcePullImage if path doesn\'t match type', function () {
      let batch = new Batch();
      batch = batch.add(
        new Transaction(['container', 'foo', 'forcePullImage'], true, SET)
      );

      expect(batch.reduce(
        Container.JSONReducer.bind({}),
        {}
      )).toEqual(null);
    });

    it('sets image correctly', function () {
      let batch = new Batch();
      batch = batch.add(
        new Transaction(['container', 'docker', 'image'], 'foo', SET)
      );

      expect(batch.reduce(
        Container.JSONReducer.bind({}),
        {}
      )).toEqual({docker: {image: 'foo'}});
    });

    it('changes image value correctly', function () {
      let batch = new Batch();
      batch = batch.add(
        new Transaction(['container', 'docker', 'image'], 'bar', SET)
      );

      expect(batch.reduce(
        Container.JSONReducer.bind({}),
        {}
      )).toEqual({docker: {image: 'bar'}});
    });

    it('doesn\'t set image if path doesn\'t match type', function () {
      let batch = new Batch();
      batch = batch.add(
        new Transaction(['container', 'foo', 'image'], 'foo', SET)
      );

      expect(batch.reduce(
        Container.JSONReducer.bind({}),
        {}
      )).toEqual(null);
    });

    describe('PortMappings', function () {

      it('should create default portDefinition configurations', function () {
        let batch = new Batch();
        batch = batch.add(new Transaction(['container', 'docker', 'network'], USER, SET));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));

        expect(batch.reduce(Container.JSONReducer.bind({}), {}))
          .toEqual({
            docker: {
              network: USER,
              portMappings: [
                {containerPort: 0, hostPort: 0, name: null, protocol: 'tcp'}
              ]
            }
          });
      });
      it('should create default portDefinition configurations', function () {
        let batch = new Batch();
        batch = batch.add(new Transaction(['container', 'docker', 'network'], BRIDGE, SET));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));

        expect(batch.reduce(Container.JSONReducer.bind({}), {}))
          .toEqual({
            docker: {
              network: BRIDGE,
              portMappings: [
                {containerPort: 0, hostPort: 0, name: null, protocol: 'tcp'}
              ]
            }
          });
      });

      it('shouldn\'t create portMappings by default', function () {
        let batch = new Batch();
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));

        expect(batch.reduce(Container.JSONReducer.bind({}), {}))
          .toEqual(null);
      });

      it('shouldn\'t create portMappings for HOST', function () {
        let batch = new Batch();
        batch = batch.add(new Transaction(['container', 'docker', 'network'], HOST, SET));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));

        expect(batch.reduce(Container.JSONReducer.bind({}), {}))
          .toEqual({docker: {network: HOST}});
      });

      it('should create two default portDefinition configurations', function () {
        let batch = new Batch();
        batch = batch.add(new Transaction(['container', 'docker', 'network'], USER, SET));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));

        expect(batch.reduce(Container.JSONReducer.bind({}), {}))
          .toEqual({
            docker: {
              network: USER,
              portMappings: [
                {containerPort: 0, hostPort: 0, name: null, protocol: 'tcp'},
                {containerPort: 0, hostPort: 0, name: null, protocol: 'tcp'}
              ]
            }
          });
      });

      it('should set the name value', function () {
        let batch = new Batch();
        batch = batch.add(new Transaction(['container', 'docker', 'network'], USER, SET));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));
        batch = batch.add(
          new Transaction(['portDefinitions', 0, 'name'], 'foo')
        );

        expect(batch.reduce(Container.JSONReducer.bind({}), {}))
          .toEqual({
            docker: {
              network: USER,
              portMappings: [
                {containerPort: 0, hostPort: 0, name: 'foo', protocol: 'tcp'}
              ]
            }
          });
      });

      it('should set the port value', function () {
        let batch = new Batch();
        batch = batch.add(new Transaction(['container', 'docker', 'network'], USER, SET));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));
        batch = batch.add(new Transaction(['portDefinitions', 0, 'automaticPort'], false));
        batch = batch.add(new Transaction(['portDefinitions', 0, 'hostPort'], 100));

        expect(batch.reduce(Container.JSONReducer.bind({}), {}))
          .toEqual({
            docker: {
              network: USER,
              portMappings: [
                {containerPort: 0, hostPort: 100, name: null, protocol: 'tcp'}
              ]
            }
          });
      });

      it('should default port value to 0 if automaticPort', function () {
        let batch = new Batch();
        batch = batch.add(new Transaction(['container', 'docker', 'network'], USER, SET));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));
        // This is default behavior
        // batch = batch.add(new Transaction(['portDefinitions', 0, 'automaticPort'], true));
        batch = batch.add(new Transaction(['portDefinitions', 0, 'hostPort'], 100));

        expect(batch.reduce(Container.JSONReducer.bind({}), {}))
          .toEqual({
            docker: {
              network: USER,
              portMappings: [
                {containerPort: 0, hostPort: 0, name: null, protocol: 'tcp'}
              ]
            }
          });
      });

      it('should set the protocol value', function () {
        let batch = new Batch();
        batch = batch.add(new Transaction(['container', 'docker', 'network'], USER, SET));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));
        batch = batch.add(new Transaction(['portDefinitions', 0, 'protocol'], 'udp'));

        expect(batch.reduce(Container.JSONReducer.bind({}), {}))
          .toEqual({
            docker: {
              network: USER,
              portMappings: [
                {containerPort: 0, hostPort: 0, name: null, protocol: 'udp'}
              ]
            }
          });
      });

      it('should add the labels key if the portDefinition is load balanced', function () {
        let batch = new Batch();
        batch = batch.add(new Transaction(['container', 'docker', 'network'], USER, SET));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));
        batch = batch.add(new Transaction(['portDefinitions', 1, 'loadBalanced'], true));

        expect(batch.reduce(Container.JSONReducer.bind({}), {}))
          .toEqual({
            docker: {
              network: USER,
              portMappings: [
                {containerPort: 0, hostPort: 0, name: null, protocol: 'tcp'},
                {containerPort: 0, hostPort: 0, name: null, protocol: 'tcp', labels: {'VIP_1': ':0'}}
              ]
            }
          });
      });

      it('should add the index of the portDefinition to the VIP keys', function () {
        let batch = new Batch();
        batch = batch.add(new Transaction(['container', 'docker', 'network'], USER, SET));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));
        batch = batch.add(new Transaction(['portDefinitions', 0, 'loadBalanced'], true));
        batch = batch.add(new Transaction(['portDefinitions', 1, 'loadBalanced'], true));

        expect(batch.reduce(Container.JSONReducer.bind({}), {}))
          .toEqual({
            docker: {
              network: USER,
              portMappings: [
                {containerPort: 0, hostPort: 0, name: null, protocol: 'tcp', labels: {VIP_0: ':0'}},
                {containerPort: 0, hostPort: 0, name: null, protocol: 'tcp', labels: {VIP_1: ':0'}}
              ]
            }
          });
      });

      it('should add the port to the VIP string', function () {
        let batch = new Batch();
        batch = batch.add(new Transaction(['container', 'docker', 'network'], USER, SET));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));
        batch = batch.add(new Transaction(['portDefinitions', 0, 'automaticPort'], false));
        batch = batch.add(new Transaction(['portDefinitions', 0, 'hostPort'], 300));
        batch = batch.add(new Transaction(['portDefinitions', 0, 'loadBalanced'], true));

        expect(batch.reduce(Container.JSONReducer.bind({}), {}))
          .toEqual({
            docker: {
              network: USER,
              portMappings: [
                {containerPort: 0, hostPort: 300, name: null, protocol: 'tcp', labels: {VIP_0: ':300'}},
                {containerPort: 0, hostPort: 0, name: null, protocol: 'tcp'}
              ]
            }
          });
      });

      it('should add the app ID to the VIP string when it is defined', function () {
        let batch = new Batch();
        batch = batch.add(new Transaction(['container', 'docker', 'network'], USER, SET));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));
        batch = batch.add(new Transaction(['portDefinitions'], 0, ADD_ITEM));
        batch = batch.add(new Transaction(['portDefinitions', 0, 'automaticPort'], false));
        batch = batch.add(new Transaction(['portDefinitions', 1, 'loadBalanced'], true));
        batch = batch.add(new Transaction(['id'], 'foo'));

        expect(batch.reduce(Container.JSONReducer.bind({}), {}))
          .toEqual({
            docker: {
              network: USER,
              portMappings: [
                {containerPort: 0, hostPort: 0, name: null, protocol: 'tcp'},
                {containerPort: 0, hostPort: 0, name: null, protocol: 'tcp', labels: {'VIP_1': 'foo:0'}}
              ]
            }
          });
      });

    });

  });

});
