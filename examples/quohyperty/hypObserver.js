function hypertyLoaded(result) {
  let hypertyObserver = result.instance;
  $('.selection-panel').hide();

  let hypertyPanel = $('.hyperty-panel');
  let hi = '<p>Hyperty Observer URL: ' + result.runtimeHypertyURL + '</p>';

  hypertyPanel.append(hi);

  hypertyObserver.addEventListener('invitation', function(identify) {
    JSON.stringify(identify);
    let invitationPanel = $('.invitation-panel');
    let invitation = `<p> Invitation received from:\n ` + identity.infoToken.name + '</p>';
    invitationPanel.append(invitation);
  });

  hypertyObserver.addEventListener('random-number', function(event) {
    let msgPanel = $('.msg-panel');
    let msg = `<p>  ` + event.hello + `</p>`;
    msgPanel.append(msg);
  });
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
