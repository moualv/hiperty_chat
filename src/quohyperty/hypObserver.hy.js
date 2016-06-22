import {Syncher} from 'service-framework/dist/Syncher';
import {divideURL} from '../utils/utils';
import EventEmitter from '../utils/EventEmitter';


class HypObserver extends EventEmitter {

  constructor(hypertyURL, bus, configuration) {
    super();
    let _this = this;
    _this._objectDescURL = 'hyperty-catalogue://catalogue.' + domain + '/.well-known/dataschema/hypDataSchema';

    let syncher = new Syncher(hypertyURL, bus, configuration);
    syncher.onNotification(function(event) {
      _this._onNotification(event);
    });

    _this._syncher = syncher;
  }

  _onNotification(event) {
    let _this = this;

    _this.trigger('invitation', event.identity);

    event.ack();

    _this.syncher.subscribe(_this.objectDescURL, event.url).then( function(objObserver) {
      //cambiar el trigger
      _this.trigger('random-number', objObserver.data);

      objObserver.onChange('*', function(event) {
        //cambiar el trigger
        _this.trigger('random-number', objObserver.data);
      });
    });
  }
}

export default function activate(hypertyURL, bus, configuration) {
  return {
    name: 'hypObserver',
    instance: new HypObserver(hypertyURL, bus, configuration)
  };

}
