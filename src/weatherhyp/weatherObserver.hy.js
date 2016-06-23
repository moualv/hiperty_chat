import {Syncher} from 'service-framework/dist/Syncher';
import {divideURL} from '../utils/utils';
import EventEmitter from '../utils/EventEmitter';


class HypObserver extends EventEmitter {

  constructor(hypertyURL, bus, configuration) {
    super();
    let _this = this;
    let domain = divideURL(hypertyURL).domain;
    _this._objectDescURL = 'hyperty-catalogue://catalogue.' + domain + '/.well-known/dataschema/HelloWorldDataSchema';

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

    _this._syncher.subscribe(_this._objectDescURL, event.url).then( function(objObserver) {
      console.info('me subscribí');
      console.info(objObserver.data.hello);
      _this.trigger('random-number', objObserver.data);
      _this._syncher.create(_this._objectDescURL, [objObserver.data.hello],_this._onNotification).then(function(objReporter){
        console.info('objeto creado');
        objReporter.data.hello = 'SALUDOS BRO';
        objReporter.onSubscription(function(event) {
          console.info('-------- Random Number Reporter received subscription request --------- \n');
          event.accept();
        });
      });

      objObserver.onChange('*', function(event) {
        //cambiar el trigger
        _this.trigger('random-number', objObserver.data);
        objObserver.data.hello = "hola ke ase";
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
