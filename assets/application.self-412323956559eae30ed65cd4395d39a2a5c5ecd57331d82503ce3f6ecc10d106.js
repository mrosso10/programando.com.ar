(function() {
  var borrar, borrar_mal, borrar_siguiente, escribir, escribir_mal, escribir_siguiente, execute, next, titilar, voltear_siguientes;

  escribir = function(can_fail) {
    var e, texto;
    e = $('.programando');
    texto = e.attr('data-text');
    if (texto.length > 0) {
      if (can_fail && texto.length > 1 && Math.random() > (0.98 - e.text().length * .04)) {
        return escribir_mal(2 + Math.ceil((texto.length - 2) * Math.random()));
      } else {
        escribir_siguiente();
        return setTimeout(function() {
          return escribir(can_fail);
        }, next());
      }
    } else {
      return setTimeout(function() {
        return borrar();
      }, next(70));
    }
  };

  borrar = function() {
    var e, texto;
    e = $('.programando');
    texto = e.text();
    if (texto.length > 0) {
      borrar_siguiente();
      return setTimeout(function() {
        return borrar();
      }, next());
    } else {
      return setTimeout(function() {
        return escribir(true);
      }, next());
    }
  };

  escribir_mal = function(n) {
    var n2, results;
    voltear_siguientes();
    n2 = n;
    setTimeout(function() {
      return borrar_mal(n2);
    }, next(n + 3));
    results = [];
    while (n-- > 0) {
      results.push(setTimeout(function() {
        return escribir_siguiente();
      }, next(n + 1)));
    }
    return results;
  };

  borrar_mal = function(n) {
    var results;
    setTimeout(function() {
      voltear_siguientes();
      return escribir(false);
    }, next(n + 3));
    results = [];
    while (n-- > 0) {
      results.push(setTimeout(function() {
        return borrar_siguiente();
      }, next(n + 1)));
    }
    return results;
  };

  next = function(i) {
    if (i == null) {
      i = 1;
    }
    return 100 * i + (Math.random() * 50);
  };

  voltear_siguientes = function() {
    var e, segmento, texto;
    e = $('.programando');
    texto = e.attr('data-text');
    segmento = texto.substring(0, 2);
    return e.attr('data-text', segmento[1] + segmento[0] + texto.substring(2, texto.length));
  };

  escribir_siguiente = function() {
    var e, letra, texto;
    e = $('.programando');
    texto = e.attr('data-text');
    letra = texto[0];
    e.attr('data-text', texto.substring(1, texto.length));
    return e.text(e.text() + letra);
  };

  borrar_siguiente = function() {
    var e, letra, texto;
    e = $('.programando');
    texto = e.text();
    letra = texto[texto.length - 1];
    e.text(texto.substring(0, texto.length - 1));
    return e.attr('data-text', letra + e.attr('data-text'));
  };

  execute = function(callback, at) {
    return setTimeout(function() {
      return callback();
    }, at);
  };

  titilar = function() {
    var e;
    e = $('.guion');
    if (e.text().lastIndexOf('_') > -1) {
      e.text('');
    } else {
      e.text('_');
    }
    return setTimeout(function() {
      return titilar();
    }, 500);
  };

  $(document).ready(function() {
    escribir(true);
    return titilar();
  });

}).call(this);
