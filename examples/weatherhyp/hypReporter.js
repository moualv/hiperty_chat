var hyperty

function hypertyLoaded(result) {
	hyperty = result.instance;

	console.log(hyperty);

	$('.selection-panel').hide();

	let hypertyPanel = $('.hyperty-panel');

	let hi = '<p>Hyperty Reporter URL: ' + result.runtimeHypertyURL + '</p>';

	hypertyPanel.append(hi);


	let random = $('.random-panel');

	let sayRandTo = '<form class="rand"> Hyperty URL: <input class="to-hyperty-input" type="text" name="toHyperty"><br><input type="submit" value="GenRand"></form>'

	random.append(sayRandTo);

	$('.rand').on('submit', sayRan);
}

function sayRan(event) {

	event.preventDefault();

	let toHypertyForm = $(event.currentTarget);

	let toHyperty = toHypertyForm.find('.to-hyperty-input').val();


	hyperty.random(toHyperty).then(function(randomObject) {

    $('.random-panel').hide();

    var randomUrl = '<p>Random URL: '+ randomObject.url + '</p>';

    let bye = $('.rand-again');

    let sayRand = '<button class="say-rand-again">Say rand</button>';

    bye.append(randomUrl);

		bye.append(sayRand);

  	}).catch(function(reason) {
    	console.error(reason);
  	});

    $('.rand-again').on('click', sayRan);
}

Handlebars.getTemplate = function(name) {

  return new Promise(function(resolve, reject) {

    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
      Handlebars.templates = {};
    } else {
      resolve(Handlebars.templates[name]);
    }

    $.ajax({
      url: 'templates/' + name + '.hbs',
      success: function(data) {
        Handlebars.templates[name] = Handlebars.compile(data);
        resolve(Handlebars.templates[name]);
      },

      fail: function(reason) {
        reject(reason);
      }
    });

  });

}
