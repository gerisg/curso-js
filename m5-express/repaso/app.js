const autos = require('./autos');

let concesionaria = {
   autos: autos,
   buscarAuto: function(patente) {
      let auto = autos.find(auto => auto.patente === patente);
      if (auto != undefined) {
         return auto;
      }
      return null;
   },
   venderAuto: function(patente) {
      let auto = this.buscarAuto(patente);
      if (auto) {
          auto.vendido = true;
      }
   },
   autosParaLaVenta: function() {
      return autos.filter(auto => !auto.vendido);
   },
   autos0KM: function() {
      return this.autosParaLaVenta().filter(auto => auto.km < 100);
   },
   listaDeVentas: function() {
      return autos.filter(auto => auto.vendido).map(auto => auto.precio);
   },
   totalDeVentas: function() {
      return this.listaDeVentas().reduce((accum, current) => accum + current, 0);
   },
   puedeComprar: function(auto, persona) {
      let estaEnPrecio = auto.precio <= persona.capacidadDePagoTotal;
      let puedePagar = (auto.precio / auto.cuotas) <= persona.capacidadDePagoEnCuotas;
      return estaEnPrecio && puedePagar;
   },
   autosQuePuedeComprar: function(persona) {
      return autos.filter(auto => auto.precio <= persona.capacidadDePagoTotal)
      .filter(auto => (auto.precio / auto.cuotas) <= persona.capacidadDePagoEnCuotas);
   }
}

console.log(concesionaria.autosQuePuedeComprar({
   nombre: "Juan",
   capacidadDePagoEnCuotas: 20000,
   capacidadDePagoTotal: 150000
}));