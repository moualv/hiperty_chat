import {Syncher} from 'service-framework/dist/Syncher';
import {divideURL} from '../utils/utils';
import random from './random';

class HypReporter {

	constructor(hypertyURL, bus, configuration) {

	    if (!hypertyURL) throw new Error('The hypertyURL is a needed parameter');
	    if (!bus) throw new Error('The MiniBus is a needed parameter');
	    if (!configuration) throw new Error('The configuration is a needed parameter');

			let _this = this;

	    let domain = divideURL(hypertyURL).domain;
			_this._hypertyURL = hypertyURL;
    	_this._domain = domain;
	    this._objectDescURL = 'hyperty-catalogue://catalogue.' + domain + '/.well-known/dataschema/HelloWorldDataSchema';

	    let syncher = new Syncher(hypertyURL, bus, configuration);

    	_this._syncher = syncher;
			_this._syncher.onNotification(function(event) {
				syncher.subscribe(_this._objectDescURL, event.url).then(function (objObserver) {
					_this.objObserver = objObserver;

					_this.objObserver.onChange('*', function(event) {
						//cambiar el trigger
						console.info('¡¡¡¡ONCHANGE');
					});
				});
			});
	}

	random(hypertyURL) {
		let _this = this;
		let syncher = _this._syncher;

	    return new Promise(function(resolve, reject) {


	      syncher.create(_this._objectDescURL, [hypertyURL], random).then(function(objReporter) {
	        console.info('1. Return Created Random Number Data Object Reporter', objReporter);

	        _this.objReporter = objReporter;
					//TODO: url del usuario aqui
					console.log('Aquí la info:');
					console.info(_this._hypertyURL);
	        _this.objReporter.data.hello = _this._hypertyURL;

	        objReporter.onSubscription(function(event) {
	          console.info('-------- Random Number Reporter received subscription request --------- \n');

	          // All subscription requested are accepted

	          event.accept();
	        });

					resolve(objReporter);
				})
      	.catch(function(reason) {
        	console.error(reason);
        	reject(reason);
      	});
		});
	}


	random_again() {

    	console.log('bye:', this.objReporter );

	    this.objReporter.data.hello = Math.random();
  	}

}


export default function activate(hypertyURL, bus, configuration) {
  return {
    name: 'hypReporter',
    instance: new HypReporter(hypertyURL, bus, configuration)
  };

}
