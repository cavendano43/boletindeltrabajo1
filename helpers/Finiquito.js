const moment = require('moment');
moment.locale('es');

const css=`
.container{
  padding:3rem;
  font-size:13pt;
  font-family:'Times New Roman';
}
.max-width-150{
  max-width:150px;
}
.img-fluid{
  max-width: 100%;
  height: auto;
}
h1 {
    color: green;
}
.pt-3{
  padding-top:1rem !important;
}
.pl-3, .px-3 {
  padding-left: 1rem !important;
}
.pr-3, px-3{
  padding-right: 1rem !important;
}
.m-0{
  margin:0;
}
.mt-0{
  margin-top:0;
}
.mb-0{
  margin-bottom:0;
}
.mb-3{
  margin-bottom:.5rem;
}
.text-lowercase {
  text-transform: lowercase !important;
}
.text-uppercase {
  text-transform: uppercase !important;
}
.text-capitalize {
  text-transform: capitalize !important;
}
.text-justify{
  text-align:justify !important;
}
.text-center{
  text-align:center !important;
}
.text-left {
  text-align: left !important;
}
.text-right {
  text-align: right !important;
}
.row{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.py-5{
  padding-top:3rem;
  padding-bottom:3rem;
}
.col{
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;
}
.w-347p{
  width:347px;
}
.w-189p{
  width:189px;
}
.d-flex{
  display: -ms-flexbox!important;
  display: flex!important;
}
.justify-content-end {
    -ms-flex-pack: end!important;
    justify-content: flex-end!important;
}
.w-100{
  width:100% !important;
}

`;
exports.modeloCartaAviso = (datos)=>{

    const fechaactual=moment().format('LL');
    const salud=datos.datospersonales.salud=='ISAPRES' ? `${datos.datospersonales.salud} ${datos.datospersonales.isapres}`:datos.datospersonales.salud;
    const indemnizacion=datos.datosresumen.indemnizacionanioserviciototal.split(".").join("");
    const descuentosafc=datos.datosresumen.descuentoaporteafc!=0 ? `$${formateadordemiles(datos.datosresumen.descuentoaporteafc)}.- (${MaysPrimera(milmillon(datos.datosresumen.descuentoaporteafc).toLowerCase())} pesos).-`:`$${datos.datosresumen.descuentoaporteafc}.-`;
    const indemnizacionpalabra=MaysPrimera(milmillon(indemnizacion).toLowerCase());
    const causal=datos.datospersonales.causal;

    let logo=datos.datospersonales.logo !='' ? `<div class="mb-3 max-width-150"><img class="img-fluid" src="${datos.datospersonales.logo}" /></div>` : '';
  
    let articulo="";   
    let titulocausal="";
    let fundamento="";
    let indemnizacionparrafo="";
    if(causal=="Artículo 161 Necesidades de La Empresa" || causal=="Artículo 161 Desahucio"){
      articulo=causal.split(" ",2).join(" ");
      indemnizacionparrafo=`<p class="text-justify">Así mismo, le comunico a usted que el monto de la indemnización por años de servicios asciende a la suma de $${datos.datosresumen.indemnizacionanioserviciototal}.- (${indemnizacionpalabra} Pesos).</p>
      <p class="text-justify">Además, se deduce de la indemnización por años de servicios el aporte empleador por un monto de ${descuentosafc} conforme a lo dispuesto en el artículo 13 de la ley N°19.728 sobre Seguro de Cesantía o Desempleo.</p>`;
      if(causal=="Artículo 161 Necesidades de La Empresa" ){
        titulocausal=`${causal.slice(13)} establecimiento y servicio`;
        fundamento="Los hechos en que se fundamenta dicha causal son: Racionalizacíon por cambio en las condiciones de mercado o modernización de los mismos y la reestructuración interna que hace inevitable su desvinculación."
      }else{
        titulocausal=causal.slice(13);
        fundamento="Los hechos en que se fundamenta dicha causal son: o trabajadores de casa particular."
      }

    }else{
      articulo=causal.split(" ",4).join(" ");
      titulocausal=causal.slice(18);

      if(causal="Artículo 160 N° 1 Conductas Indebidas de Caracter Grave"){
        titulocausal+=`, debidamente comprobadas, ${datos.datospersonales.inciso}`;
      }
      if(causal="Artículo 160 N° 2 Negociaciones del trabajador dentro del giro del negocio"){
        titulocausal+=`Negociaciones que ejecute el trabajador dentro del giro del negocio y que hubieren sido prohibidas por escrito en el respectivo contrato por el empleador`;
      }
      if(causal="Artículo 160 N° 3 No concurrencia a labores sin causa justificada"){
        titulocausal+=`No concurrencia del trabajador a sus labores sin causa justificada durante dos días seguidos,dos lunes en el mes o un total de tres días durante igual período de tiempo; asimismo, la falta injustificada, o sin aviso previo de parte del trabajador que tuviere a su cargo una actividad, faena o máquina cuyo abandono o paralizacíon signifique una perturbacíon grave en la marcha de la obra`;
      }
      if(causal="Artículo 160 N° 4 Abandono del trabajo por parte del trabajador"){
        titulocausal+=`, entendiéndose por tal, ${datos.datospersonales.inciso}`;
      }
      if(causal="Artículo 160 N° 5 Actos que afectan a la seguridad"){
        titulocausal+=`Actos, omisiones o imprudencias temerarias, que afecten a la seguridad o al funcionamiento del establecimiento, a la seguridad o a la actividad de los trabajadores`;
      }
      if(causal="Artículo 160 N° 6 Perjuicio material causado intencionalmente"){
        titulocausal+=`Negociaciones que ejecute el trabajador dentro del giro del negocio y que hubieren sido prohibidas por escrito en el respectivo contrato por el empleador`;
      }
      indemnizacionparrafo="";
      fundamento="";
    }

    return `<!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Carta de Aviso</title>
        <style>
            ${css}
        </style>
      </head>
      <body>

          <div class="container">
            ${logo}
            <p class="m-0 mb-3"><strong>${datos.datospersonales.direccion}, ${fechaactual}.</strong></p>
            <p class="m-0">Ref.: “Aviso de Termino de Contrato de Trabajo por Necesidades de La Empresa Establecimiento y Servicio”</p>
            <p class="m-0"><strong>Don(ña) ${datos.datospersonales.nombretrabajador}</strong></p>
            <p class="m-0"><strong>C.I.: ${datos.datospersonales.ruttrabajador}</strong></p>
            <p class="m-0"><strong>Dirección: ${datos.datospersonales.direcciontrabajador}</strong></p>
            <p class="m-0"><strong>Comuna de ${datos.datospersonales.comunatrabajador}</strong></p>
            <p class="m-0"><strong>${datos.datospersonales.regiontrabajador}</strong></p>
            <p class="m-0"><strong><u>Presente</u></strong></p>
            <p class="m-0"><strong>-</strong></p>
            <p class="m-0 mb-3"><strong>De mi consideración:</strong></p>
            <p class="text-justify mb-0">Comunico a Ud. que esta empresa ha decidido, poner término a su contrato de trabajo con fecha 19 de Noviembre del 2020, por la causal del ${articulo} del Código del Trabajo, esto es, ${titulocausal}. Los hechos en que se fundamenta dicha causal son: Racionalizacíon por cambio en las condiciones de mercado o modernización de los mismos y la reestructuración interna que hace inevitable su desvinculación.</p>
            ${indemnizacionparrafo}
            <p class="text-justify mb-0">Se deja constancia, que el trabajador ha tenido a la vista y está plenamente de acuerdo con los pagos efectuados y no tiene ningún reparo que hacer respecto a sus cotizaciones previsionales.</p>
            <p class="text-justify m-0">En cumplimiento de las disposiciones legales vigentes en materia de terminación de contrato de trabajo, hago presente a Ud. que sus cotizaciones previsionales han sido enteradas oportunamente en la institución previsionales a que se encuentra afiliada <strong>(A.F.P. ${datos.datospersonales.afp} y ${salud})</strong>.</p>
            <p>Saluda atentamente a usted,</p>
            <br>
            <br>
            <p class="text-right">Recibí copia de la presente carta:</p>
            <br>
            <br>
            <div class="row">
              <div class="col">
                <p>__________________________________</p>
                <p class="m-0"><strong>${datos.datospersonales.nombreempresa}</strong></p>
                <p class="m-0"><strong>Rut: ${datos.datospersonales.rutempresa}</strong></p>
              </div>
              <div class="col">
                <p class="text-right">__________________________________</p>
                <p class="text-right m-0"><strong>${datos.datospersonales.nombretrabajador}</strong></p>
                <p class="text-right m-0"><strong>C.I.: ${datos.datospersonales.ruttrabajador}</strong></p>
              </div>
            </div>
            <br>
            <p class="mb-0"><strong>Dirección: ${datos.datospersonales.direccion}, ${datos.datospersonales.comunaempresa}, Región ${datos.datospersonales.regionempresa}.</strong></p>
            <p class="m-0"><strong>C.C.: Inspección del Trabajo.</strong></p>
          </div>
      </body>
</html>`;
}

exports.modeloFiniquito = (datos)=>{
  console.log(datos);
  const fechaactual=moment().format('LL');
  const fechainicio=moment(datos.datosfechas.fechainicio).format('LL');
  const fechatermino=moment(datos.datosfechas.fechatermino).format('LL');
  const saldoapagar=datos.datosresumen.saldoapagar.split(".").join("");
  const saldoapagarpalabra=MaysPrimera(milmillon(saldoapagar).toLowerCase());
  const causal=datos.datospersonales.causal;

  let logo=datos.datospersonales.logo !='' ? `<div class="mb-3 max-width-150"><img class="img-fluid" src="${datos.datospersonales.logo}" /></div>` : '';
  let articulo="";
  let titulocausal="";
  let indemnizacion="";
  let descuentos="";
  let fundamento="";

  if(causal=="Artículo 161 Necesidades de La Empresa" || causal=="Artículo 161 Desahucio"){
    articulo=causal.split(" ",2).join(" ");
    titulocausal=causal=="Artículo 161 Necesidades de La Empresa" ? `${causal.slice(13)} establecimiento y servicio Los hechos en que se fundamenta dicha causal son: Racionalizacíon por cambio en las condiciones de mercado o modernización de los mismos y la reestructuración interna que hace inevitable su desvinculación`:``;
    fundamento="";
    indemnizacion=`
    <tr>
      <td class="w-347p"><p class="m-0">Indemnizacion Por Años de Servicios <strong>(${datos.datosresumen.indemnizacionanioservicioanios})</strong></p></td>
      <td class="w-189p"><p class="text-left m-0">$ ${datos.datosresumen.indemnizacionanioserviciototal}.-</p></td>
    </tr>
    <tr>
      <td class="w-347p"><p class="m-0">Indemnizacion Sustitutiva de aviso previo</p></td>
      <td class="w-189p"><p class="text-left m-0">$ ${datos.datosresumen.indemnizacionsustitutiva}.-</p></td>
    </tr>`;
    descuentos=`
    <tr>
      <td class="w-347p"><p class="m-0">DESCUENTOS:</p></td>
      <td class="w-189p"><p class="text-left m-0"></p></td>
    </tr>
    <tr>
      <td class="w-347p"><p class="m-0">Otros Descuentos</p></td>
      <td class="w-189p"><p class="text-left m-0">-($ ${datos.datosresumen.descuentosotros}.-)</p></td>
    </tr>
    <tr>
      <td class="w-347p"><p class="m-0">(-) Aporte Empleador Seguro Cesantía</p></td>
      <td class="w-189p"><p class="text-left m-0">-($ ${datos.datosresumen.descuentoaporteafc}.-)</p></td>
    </tr>
    <tr>
      <td colspan="2">
         <hr class="m-0">
      </td>
    </tr>
    <tr>
      <td class="w-347p"><p class="m-0">Sub total descuentos</td>
      <td class="w-189p"><p class="text-left m-0">-($ ${datos.datosresumen.descuentototal}.-)</p></td>
    </tr>`;
  }else{
    articulo=causal.split(" ",4).join(" ");
    titulocausal=causal.slice(18);
  
    if(causal=="Artículo 160 N° 1 Conductas Indebidas de Caracter Grave"){
      titulocausal+=`, debidamente comprobadas, ${datos.datospersonales.inciso}`;
    }
    if(causal=="Artículo 160 N° 2 Negociaciones del trabajador dentro del giro del negocio"){
      titulocausal+=`Negociaciones que ejecute el trabajador dentro del giro del negocio y que hubieren sido prohibidas por escrito en el respectivo contrato por el empleador`;
    }
    if(causal=="Artículo 160 N° 3 No concurrencia a labores sin causa justificada"){
      titulocausal+=`No concurrencia del trabajador a sus labores sin causa justificada durante dos días seguidos,dos lunes en el mes o un total de tres días durante igual período de tiempo; asimismo, la falta injustificada, o sin aviso previo de parte del trabajador que tuviere a su cargo una actividad, faena o máquina cuyo abandono o paralizacíon signifique una perturbacíon grave en la marcha de la obra`;
    }
    if(causal=="Artículo 160 N° 4 Abandono del trabajo por parte del trabajador"){
      titulocausal+=`, entendiéndose por tal, ${datos.datospersonales.inciso}`;
    }
    if(causal=="Artículo 160 N° 5 Actos que afectan a la seguridad"){
      titulocausal+=`Actos, omisiones o imprudencias temerarias, que afecten a la seguridad o al funcionamiento del establecimiento, a la seguridad o a la actividad de los trabajadores`;
    }
    if(causal=="Artículo 160 N° 6 Perjuicio material causado intencionalmente"){
      titulocausal+=`Negociaciones que ejecute el trabajador dentro del giro del negocio y que hubieren sido prohibidas por escrito en el respectivo contrato por el empleador`;
    }

    indemnizacion="";
    descuentos="";
    fundamento="";
  }
  return `<!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Modelo de finiquito</title>
          <style>
            ${css}
          </style>
      </style>
    </head>
    <body>
  
      <div class="container pt-3">
                
          <div class="d-flex justify-content-end ">
            ${logo}
          </div>
  
        <h3 class="mb-3 text-center"><strong><u>FINIQUITO CONTRATO DE TRABAJO</u></strong></h3>
        <br>
        <p class="text-justify">En ${datos.datospersonales.direccion}, a ${fechaactual}, <strong>${datos.datospersonales.nombreempresa}</strong>, Comuna de ${datos.datospersonales.comunaempresa}, en adelante el 'Empleador', <strong>RUT: ${datos.datospersonales.rutempresa}</strong>, en adelante, también, 'la empresa' o 'el empleador', representada por Don <strong class="text-capitalize">${datos.datospersonales.nombrerepresentante.toLowerCase()}</strong><strong>, C.I. ${datos.datospersonales.rutrepresentante}</strong>, ambos domiciliados en esta ciudad, ${datos.datospersonales.direccion}, por una parte; y la otra, Don <strong class="text-capitalize">${datos.datospersonales.nombretrabajador.toLowerCase()}</strong><strong>, C.I.:${datos.datospersonales.ruttrabajador}</strong>, adelante, también, 'el trabajador', se deja testimonio y se ha acordado el finiquito que consta de las siguientes cláusulas:</p>
        <p class="text-justify"><strong>PRIMERO:</strong> El trabajador prestó servicios al empleador desde ${fechainicio} hasta el ${fechatermino}, fecha esta última en que su contrato de trabajo ha terminado por la causal contemplada en el ${articulo} del Código del Trabajo, esto es, ${titulocausal}.</p>
        <p class="text-justify"><strong>SEGUNDO:</strong> Don ${datos.datospersonales.nombretrabajador} declara recibir en este acto, a su entera satisfacción de parte de <strong>${datos.datospersonales.nombreempresa}</strong>, la suma de <strong>$${datos.datosresumen.saldoapagar}.- (${saldoapagarpalabra})</strong></p>
        <table class="pl-3">
          <tbody>
            ${indemnizacion}
            <tr>
              <td class="w-347p"><p class="m-0">Feriado proporcional (${datos.datosfechas.feriadoproporcional} días)</p></td>
              <td class="w-189p"><p class="text-left m-0"><u>$ ${datos.datosresumen.feriadoproporcional}.-</u></p></td>
            </tr>
            <tr>
              <td class="w-347p"><p class="m-0">Sub total</p></td>
              <td class="w-189p"><p class="text-left m-0">$ ${datos.datosresumen.indemnizaciontotal}.-</p></td>
            </tr>
           
            ${descuentos}
            <tr>
              <td class="w-347p"><p class="m-0">TOTAL A PAGAR</td>
              <td class="w-189p"><p class="text-left m-0">$ ${datos.datosresumen.saldoapagar}.-</p></td>
            </tr>
          </tbody>
        </table>
        <p class="text-justify"><strong>TERCERO:</strong> En consecuencia, el empleador paga a <span class="text-capitalize">${datos.datospersonales.nombretrabajador.toLowerCase()}</span>, la suma <strong>$${datos.datosresumen.saldoapagar}.- (${saldoapagarpalabra} pesos).</strong></p>
        <p class="text-justify">Don(ña) <span class="text-capitalize">${datos.datospersonales.nombretrabajador.toLowerCase()}</span>, deja constancia que durante el tiempo que prestó servicios a ${datos.datospersonales.nombreempresa}, recibió oportunamente el total de las remuneraciones, beneficios y demás prestaciones convenidas de acuerdo a su contrato de trabajo, clase de trabajo ejecutado y disposiciones legales pertinentes, y que en tal virtud el empleador nada le adeuda por tales conceptos, ni por horas extraordinarias, asignación familiar, feriado, indemnizaciones por término de la relación laboral tales como feriado legal o proporcional, sustitutiva del aviso previo y por años de servicios, cotizaciones de seguridad social, así como por ningún otro concepto, ya sea legal o contractual, derivado de la prestación de sus servicios, de su contrato de trabajo o de la terminación del mismo. En consecuencia, Don(ña) <span class="text-capitalize">${datos.datospersonales.nombretrabajador.toLowerCase()}</span>, declara que no tiene reclamo alguno que formular en contra de ${datos.datospersonales.nombreempresa}, renunciando a todas las acciones que pudiera emanar del contrato que los vinculó.</p>
        <p class="text-justify"><strong>CUARTO:</strong> En virtud de lo anteriormente expuesto, Don(ña) <span class="text-capitalize">${datos.datospersonales.nombretrabajador.toLowerCase()}</span> manifiesta expresamente que ${datos.datospersonales.nombreempresa} nada le adeuda en relación con los servicios prestados, con el contrato de trabajo o con motivo de la terminación del mismo, por lo que libre y espontáneamente, y con el pleno y cabal conocimiento de sus derechos, otorga a su empleador, el más amplio, completo, total y definitivo finiquito por los servicios prestados o la terminación de ellos, ya diga relación con remuneraciones, cotizaciones previsionales, de seguridad social o de salud, subsidios, beneficios contractuales adicionales a las remuneraciones, indemnizaciones, compensaciones, o con cualquiera causa o concepto.</p>
        <p class="text-justify"><strong>QUINTO:</strong>Asimismo, Don(ña) <span class="text-capitalize">${datos.datospersonales.nombretrabajador.toLowerCase()}</span>, declara el trabajador que, en todo caso, y a todo evento, renuncia expresamente a cualquier derecho, acción o reclamo, sea estos en instancias administrativas o judiciales, que eventualmente tuviere o pudiere corresponderle en contra del empleador, en relación directa o indirecta con su contrato de trabajo, con los servicios prestados, con la terminación del referido contrato o dichos servicios, sepa que esos derechos o acciones correspondan a remuneraciones, cotizaciones previsionales, de seguridad social o de salud, subsidios, beneficios contractuales adicionales a las remuneraciones, indemnizaciones compensaciones, o con cualquier otra causa o concepto.</p>
        <p class="text-justify">Para constancia, las partes firman el presente finiquito en dos ejemplares, quedando uno en poder de cada una de ellas, y en cumplimiento de la legislación vigente, Don(ña) <span class="text-capitalize">${datos.datospersonales.nombretrabajador.toLowerCase()}</span> lo lee, firma y se ratifica ante mí.</p>
        <br>
        <br>
        <div class="row">
          <div class="col">
            <p>________________________________</p>
            <p><strong>${datos.datospersonales.nombreempresa}</strong></p>
            <p><strong>Rut: ${datos.datospersonales.rutempresa}</strong></p>
          </div>
          <div class="col">
            <p class="text-right">________________________________</p>
            <p class="text-right"><strong class="text-capitalize">${datos.datospersonales.nombretrabajador.toLowerCase()}</strong></p>
            <p class="text-right"><strong>C.I.: ${datos.datospersonales.ruttrabajador}</strong></p>
          </div>
        </div>
      </div>
  
    </body>
  </html>`;
}

exports.modeloCalculo = (datos)=>{
  let contenedorvariables="";
  let contenedordescuentos="";
  let contenedorindemnizacion="";
  let contenedorgratificacion="";
  const causal=datos.datospersonales.causal;
  if(datos.datospersonales.tiposueldo=="Variable"){
    contenedorvariables=`
  <tr>
    <td class="px-3"><p><strong>Meses</strong></p></td>
    <td class="px-3"><p><strong>Mes 1</strong></p></td>
    <td class="px-3"><p><strong>Mes 2</strong></p></td>
    <td class="px-3"><p><strong>Mes 3</strong></p></td>
  </tr>

  <tr>
    <td class="px-3"><p><strong>Comisiones</strong></p></td>
    <td class="px-3"><p><strong>$ ${datos.datoscalculo.comisiones[0]}</strong></p></td>
    <td class="px-3"><p><strong>$ ${datos.datoscalculo.comisiones[1]}</strong></p></td>
    <td class="px-3"><p><strong>$ ${datos.datoscalculo.comisiones[2]}</strong></p></td>
  </tr>

  <tr>
    <td class="px-3"><p><strong>Semana Corridas</strong></p></td>
    <td class="px-3"><p><strong>$ ${datos.datoscalculo.semanacorrida[0]}</strong></p></td>
    <td class="px-3"><p><strong>$ ${datos.datoscalculo.semanacorrida[1]}</strong></p></td>
    <td class="px-3"><p><strong>$ ${datos.datoscalculo.semanacorrida[2]}</strong></p></td>
  </tr>

  <tr>
    <td class="px-3"><p><strong>Bonos</strong></p></td>
    <td class="px-3"><p><strong>$ ${datos.datoscalculo.bonosvariable[0]}</strong></p></td>
    <td class="px-3"><p><strong>$ ${datos.datoscalculo.bonosvariable[1]}</strong></p></td>
    <td class="px-3"><p><strong>$ ${datos.datoscalculo.bonosvariable[2]}</strong></p></td>
  </tr>

  <tr>
    <td class="px-3"><p><strong>Otras</strong></p></td>
    <td class="px-3"><p><strong>$ ${datos.datoscalculo.otras[0]}</strong></p></td>
    <td class="px-3"><p><strong>$ ${datos.datoscalculo.otras[1]}</strong></p></td>
    <td class="px-3"><p><strong>$ ${datos.datoscalculo.otras[2]}</strong></p></td>
  </tr>

  <tr>
    <td class="px-3" colspan="4">
      <small>
        <strong>
          Total Remuneración Variable
        </strong>
      </small>
      <p class="m-0">
        <strong>$ ${datos.datoscalculo.totalderemuneracionvariable}</strong>
      </p>
    </td>
  </tr>`;

  }else{
    contenedorvariables="";
  }

  if(causal=="Artículo 161 Necesidades de La Empresa" || causal=="Artículo 161 Desahucio"){
    contenedorgratificacion=`<tr>
    <td class="px-3" colspan="4">
      <small>
        <strong>
          Gratificación
        </strong>
      </small>
      <p class="m-0">
        <strong>$ ${datos.datoscalculo.totalgratificacion}</strong>
      </p>
    </td>
  </tr>`;
    
    contenedordescuentos=`
  <tr class="px-3">
    <td colspan="4"><h3 class="text-center">Descuentos</h3></td>
  </tr>

  <tr>
    <td class="px-3" colspan="4">
      <small>
        <strong>
          Aporte AFC
        </strong>
      </small>
      <p class="m-0">
        <strong>$ ${datos.datosresumen.descuentoaporteafc}</strong>
      </p>
    </td>
  </tr>

  <tr>
    <td class="px-3" colspan="4">
      <small>
        <strong>
          Otros Descuentos (Préstamos otorgados por la Empresa al trabajador)
        </strong>
      </small>
      <p class="m-0">
        <strong>$ ${datos.datosresumen.descuentosotros}</strong>
      </p>
    </td>
  </tr>

  <tr>
    <td class="px-3" colspan="4">
      <small>
        <strong>
          Total de Descuentos
        </strong>
      </small>
      <p class="m-0">
        <strong>$ ${datos.datosresumen.descuentototal}</strong>
      </p>
    </td>
  </tr>`;

    contenedorindemnizacion=`<tr>
    <td class="px-3" colspan="2">
      <p>
        <strong>${datos.datosresumen.indemnizacionanioservicioanios}</strong>
      </p>
    </td>
    <td class="px-3" colspan="2">
      <p>
        <strong>$ ${datos.datosresumen.indemnizacionanioserviciototal}</strong>
      </p>
    </td>
  </tr>

  <tr>
    <td class="px-3" colspan="4">
      <small>
        <strong>
          Indemnización Sustitutiva Aviso Previo (Tope Máximo 90 UF)
        </strong>
      </small>
      <p class="m-0">
        <strong>$ ${datos.datosresumen.indemnizacionsustitutiva}</strong>
      </p>
    </td>
  </tr>`;
  }else{
    contenedordescuentos="";
    contenedorindemnizacion="";
    contenedorgratificacion="";
  }
  return `<!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
      <style>
        ${css}
      </style>
    </head>
    <body>
  
      <div class="container">
        <table class="w-100" border="1">
          <tbody>
            <tr>
                <td class="px-3" colspan="4">
                  <h3 class="text-center">Datos de la Empresa</h3>
                </td>
            </tr>
            <tr >
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Nombre de la Empresa
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.nombreempresa}</strong>
                </p>
              </td>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    RUT de la Empresa
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.rutempresa}</strong>
                </p>
              </td>
            </tr>
  
            <tr >
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Nombre del Representante
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.nombrerepresentante}</strong>
                </p>
              </td>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    RUT del Representante
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.rutrepresentante}</strong>
                </p>
              </td>
            </tr>
  
            <tr>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Dirección de la Empresa
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.direccion}</strong>
                </p>
              </td>
              <td class="px-3" colspan="1">
                <small>
                  <strong>
                    Región
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.regionempresa}</strong>
                </p>
              </td>
              <td class="px-3" colspan="1">
                <small>
                  <strong>
                    Comuna
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.comunaempresa}</strong>
                </p>
              </td>
            </tr>
  
            <tr>
                <td class="px-3" colspan="4">
                  <h3 class="text-center">Datos del Trabajador</h3>
                </td>
            </tr>
  
            <tr>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Nombre del Trabajador
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.nombretrabajador}</strong>
                </p>
              </td>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    RUT del trabajador
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.ruttrabajador}</strong>
                </p>
              </td>
            </tr>
  
  
            <tr>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Dirección del Trabajador
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.direcciontrabajador}</strong>
                </p>
              </td>
              <td class="px-3" colspan="1">
                <small>
                  <strong>
                    Región
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.regiontrabajador}</strong>
                </p>
              </td>
              <td class="px-3" colspan="1">
                <small>
                  <strong>
                    Comuna
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.comunatrabajador}</strong>
                </p>
              </td>
            </tr>
  
  
  
  
            <tr>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    AFP
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.afp}</strong>
                </p>
              </td>
              <td class="px-3" colspan="1">
                <small>
                  <strong>
                    Salud
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.salud}</strong>
                </p>
              </td>
              <td class="px-3" colspan="1">
                <small>
                  <strong>
                    ISAPRE
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.isapres}</strong>
                </p>
              </td>
            </tr>
  
  
            <tr >
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Causal de término Legal
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.causal}</strong>
                </p>
              </td>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Tipo de Sueldo
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.tiposueldo}</strong>
                </p>
              </td>
            </tr>
  
            <tr>
              <td class="px-3" colspan="4">
                <small>
                  <strong>
                    Hechos
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datospersonales.fundamentodedespido}</strong>
                </p>
              </td>
            </tr>
  
            <tr class="px-3">
              <td colspan="4"><h3 class="text-center">Determinación de Tiempo</h3></td>
            </tr>
  
            <tr >
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Fecha de Inicio
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datosfechas.fechainicio}</strong>
                </p>
              </td>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Fecha de Término
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datosfechas.fechatermino}</strong>
                </p>
              </td>
            </tr>
  
            <tr>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Años de Servicios (Tiempo real de la relación laboral)
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datosfechas.anioservicio}</strong>
                </p>
              </td>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Fecha Máxima de pago del Finiquito
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datosfechas.fechapago}</strong>
                </p>
              </td>
            </tr>
  
  
            <tr>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Feriado Progresivo
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datosfechas.feriadoprogresivo}</strong>
                </p>
              </td>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Días de Feriado Legal
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datosfechas.diaferiadolegal}</strong>
                </p>
              </td>
            </tr>
  
            <tr>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Vacaciones Utilizadas
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datosfechas.vacacionesusadas}</strong>
                </p>
              </td>
              <td class="px-3" colspan="2">
                <small>
                  <strong>
                    Saldos de Vacaciones Pendientes
                  </strong>
                </small>
                <p class="m-0">
                  <strong>${datos.datosfechas.saldovaciones}</strong>
                </p>
              </td>
            </tr>
  
  
            <tr class="px-3">
              <td colspan="4"><h3 class="text-center">Base de Cálculo</h3></td>
            </tr>
  
            <tr>
              <td class="px-3" colspan="4">
                <small>
                  <strong>
                    Sueldo Base
                  </strong>
                </small>
                <p class="m-0">
                  <strong>$ ${datos.datoscalculo.sueldobase}</strong>
                </p>
              </td>
            </tr>
  
            ${contenedorgratificacion}
  
            <tr>
              <td class="px-3" colspan="4">
                <small>
                  <strong>
                    Bonos
                  </strong>
                </small>
                <p class="m-0">
                  <strong>$ ${datos.datoscalculo.bonos}</strong>
                </p>
              </td>
            </tr>
  
            <tr>
              <td class="px-3" colspan="4">
                <small>
                  <strong>
                    Asignación de Movilización
                  </strong>
                </small>
                <p class="m-0">
                  <strong>$ ${datos.datoscalculo.movilizacion}</strong>
                </p>
              </td>
            </tr>
  
            <tr>
              <td class="px-3" colspan="4">
                <small>
                  <strong>
                    Asignación de Colación
                  </strong>
                </small>
                <p class="m-0">
                  <strong>$ ${datos.datoscalculo.colacion}</strong>
                </p>
              </td>
            </tr>
  
            ${contenedorvariables}
  
            <tr>
              <td class="px-3" colspan="4">
                <small>
                  <strong>
                    Total Base de cálculo para indemnización (Tope Máximo 90 UF)
                  </strong>
                </small>
                <p class="m-0">
                  <strong>$ ${datos.datoscalculo.totalbasecalculoindemnizacion}</strong>
                </p>
              </td>
            </tr>
  
            <tr class="px-3">
              <td colspan="4"><h3 class="text-center">Resumen Indemnizaciones</h3></td>
            </tr>
  
            <tr class="px-3">
              <td colspan="4"><p class="px-3"><strong>Indemnización por años de servicio</strong></p></td>
            </tr>
  
            ${contenedorindemnizacion}
  
            <tr>
              <td class="px-3" colspan="4">
                <small>
                  <strong>
                    Feriado Proporcional
                  </strong>
                </small>
                <p class="m-0">
                  <strong>$ ${datos.datosresumen.feriadoproporcional}</strong>
                </p>
              </td>
            </tr>
  
            <tr>
              <td class="px-3" colspan="4">
                <small>
                  <strong>
                    Total Indemnizaciones
                  </strong>
                </small>
                <p class="m-0">
                  <strong>$ ${datos.datosresumen.indemnizaciontotal}</strong>
                </p>
              </td>
            </tr>
  
            ${contenedordescuentos}
  
            <tr class="px-3">
              <td colspan="4"><h3 class="text-center">Total a Pagar</h3></td>
            </tr>
  
            <tr>
              <td class="px-3" colspan="4">
                <small>
                  <strong>
                    Saldo a Pagar
                  </strong>
                </small>
                <p class="m-0">
                  <strong>$ ${datos.datosresumen.saldoapagar}</strong>
                </p>
              </td>
            </tr>
  
          </tbody>
        </table>
      </div>
  
    </body>
  </html>`;
}


function unidad(numero){
  switch (numero)
  {
  case 9:
  {
  numu = "NUEVE";
  break;
  }
  case 8:
  {
  numu = "OCHO";
  break;
  }
  case 7:
  {
  numu = "SIETE";
  break;
  }
  case 6:
  {
  numu = "SEIS";
  break;
  }
  case 5:
  {
  numu = "CINCO";
  break;
  }
  case 4:
  {
  numu = "CUATRO";
  break;
  }
  case 3:
  {
  numu = "TRES";
  break;
  }
  case 2:
  {
  numu = "DOS";
  break;
  }
  case 1:
  {
  numu = "UNO";
  break;
  }
  case 0:
  {
  numu = "";
  break;
  }
  }
  return numu;
  }

  function decena(numdero){

  if (numdero >= 90 && numdero <= 99)
  {
  numd = "NOVENTA ";
  if (numdero > 90)
  numd = numd+"Y "+(unidad(numdero - 90));
  }
  else if (numdero >= 80 && numdero <= 89)
  {
  numd = "OCHENTA ";
  if (numdero > 80)
  numd = numd+"Y "+(unidad(numdero - 80));
  }
  else if (numdero >= 70 && numdero <= 79)
  {
  numd = "SETENTA ";
  if (numdero > 70)
  numd = numd+"Y "+(unidad(numdero - 70));
  }
  else if (numdero >= 60 && numdero <= 69)
  {
  numd = "SESENTA ";
  if (numdero > 60)
  numd = numd+"Y "+(unidad(numdero - 60));
  }
  else if (numdero >= 50 && numdero <= 59)
  {
  numd = "CINCUENTA ";
  if (numdero > 50)
  numd = numd+"Y "+(unidad(numdero - 50));
  }
  else if (numdero >= 40 && numdero <= 49)
  {
  numd = "CUARENTA ";
  if (numdero > 40)
  numd = numd+"Y "+(unidad(numdero - 40));
  }
  else if (numdero >= 30 && numdero <= 39)
  {
  numd = "TREINTA ";
  if (numdero > 30)
  numd = numd+"Y "+(unidad(numdero - 30));
  }
  else if (numdero >= 20 && numdero <= 29)
  {
  if (numdero == 20)
  numd = "VEINTE ";
  else
  numd = "VEINTI"+(unidad(numdero - 20));
  }
  else if (numdero >= 10 && numdero <= 19)
  {
  switch (numdero){
  case 10:
  {
  numd = "DIEZ ";
  break;
  }
  case 11:
  {
  numd = "ONCE ";
  break;
  }
  case 12:
  {
  numd = "DOCE ";
  break;
  }
  case 13:
  {
  numd = "TRECE ";
  break;
  }
  case 14:
  {
  numd = "CATORCE ";
  break;
  }
  case 15:
  {
  numd = "QUINCE ";
  break;
  }
  case 16:
  {
  numd = "DIECISEIS ";
  break;
  }
  case 17:
  {
  numd = "DIECISIETE ";
  break;
  }
  case 18:
  {
  numd = "DIECIOCHO ";
  break;
  }
  case 19:
  {
  numd = "DIECINUEVE ";
  break;
  }
  }
  }
  else
  numd = unidad(numdero);
  return numd;
}

function centena(numc){
  if (numc >= 100)
  {
  if (numc >= 900 && numc <= 999)
  {
  numce = "NOVECIENTOS ";
  if (numc > 900)
  numce = numce+(decena(numc - 900));
  }
  else if (numc >= 800 && numc <= 899)
  {
  numce = "OCHOCIENTOS ";
  if (numc > 800)
  numce = numce+(decena(numc - 800));
  }
  else if (numc >= 700 && numc <= 799)
  {
  numce = "SETECIENTOS ";
  if (numc > 700)
  numce = numce+(decena(numc - 700));
  }
  else if (numc >= 600 && numc <= 699)
  {
  numce = "SEISCIENTOS ";
  if (numc > 600)
  numce = numce+(decena(numc - 600));
  }
  else if (numc >= 500 && numc <= 599)
  {
  numce = "QUINIENTOS ";
  if (numc > 500)
  numce = numce+(decena(numc - 500));
  }
  else if (numc >= 400 && numc <= 499)
  {
  numce = "CUATROCIENTOS ";
  if (numc > 400)
  numce = numce+(decena(numc - 400));
  }
  else if (numc >= 300 && numc <= 399)
  {
  numce = "TRESCIENTOS ";
  if (numc > 300)
  numce = numce+(decena(numc - 300));
  }
  else if (numc >= 200 && numc <= 299)
  {
  numce = "DOSCIENTOS ";
  if (numc > 200)
  numce = numce+(decena(numc - 200));
  }
  else if (numc >= 100 && numc <= 199)
  {
  if (numc == 100)
  numce = "CIEN ";
  else
  numce = "CIENTO "+(decena(numc - 100));
  }
  }
  else
  numce = decena(numc);

  return numce;
}

function miles(nummero){
  if (nummero >= 1000 && nummero < 2000){
  numm = "MIL "+(centena(nummero%1000));
  }
  if (nummero >= 2000 && nummero <10000){
  numm = unidad(Math.floor(nummero/1000))+" MIL "+(centena(nummero%1000));
  }
  if (nummero < 1000)
  numm = centena(nummero);

  return numm;
}

function decmiles(numdmero){
  if (numdmero == 10000)
  numde = "DIEZ MIL";
  if (numdmero > 10000 && numdmero <20000){
  numde = decena(Math.floor(numdmero/1000))+"MIL "+(centena(numdmero%1000));
  }
  if (numdmero >= 20000 && numdmero <100000){
  numde = decena(Math.floor(numdmero/1000))+" MIL "+(miles(numdmero%1000));
  }
  if (numdmero < 10000)
  numde = miles(numdmero);

  return numde;
}

function cienmiles(numcmero){
  if (numcmero == 100000)
  num_letracm = "CIEN MIL";
  if (numcmero >= 100000 && numcmero <1000000){
  num_letracm = centena(Math.floor(numcmero/1000))+" MIL "+(centena(numcmero%1000));
  }
  if (numcmero < 100000)
  num_letracm = decmiles(numcmero);
  return num_letracm;
}

function millon(nummiero){
  if (nummiero >= 1000000 && nummiero <2000000){
  num_letramm = "UN MILLON "+(cienmiles(nummiero%1000000));
  }
  if (nummiero >= 2000000 && nummiero <10000000){
  num_letramm = unidad(Math.floor(nummiero/1000000))+" MILLONES "+(cienmiles(nummiero%1000000));
  }
  if (nummiero < 1000000)
  num_letramm = cienmiles(nummiero);

  return num_letramm;
}

function decmillon(numerodm){
  if (numerodm == 10000000)
  num_letradmm = "DIEZ MILLONES";
  if (numerodm > 10000000 && numerodm <20000000){
  num_letradmm = decena(Math.floor(numerodm/1000000))+"MILLONES "+(cienmiles(numerodm%1000000));
  }
  if (numerodm >= 20000000 && numerodm <100000000){
  num_letradmm = decena(Math.floor(numerodm/1000000))+" MILLONES "+(millon(numerodm%1000000));
  }
  if (numerodm < 10000000)
  num_letradmm = millon(numerodm);

  return num_letradmm;
}

function cienmillon(numcmeros){
  if (numcmeros == 100000000)
  num_letracms = "CIEN MILLONES";
  if (numcmeros >= 100000000 && numcmeros <1000000000){
  num_letracms = centena(Math.floor(numcmeros/1000000))+" MILLONES "+(millon(numcmeros%1000000));
  }
  if (numcmeros < 100000000)
  num_letracms = decmillon(numcmeros);
  return num_letracms;
}

function milmillon(nummierod){
  if (nummierod >= 1000000000 && nummierod <2000000000){
  num_letrammd = "MIL "+(cienmillon(nummierod%1000000000));
  }
  if (nummierod >= 2000000000 && nummierod <10000000000){
  num_letrammd = unidad(Math.floor(nummierod/1000000000))+" MIL "+(cienmillon(nummierod%1000000000));
  }
  if (nummierod < 1000000000)
  num_letrammd = cienmillon(nummierod);

  return num_letrammd;
}

function formateadordemiles(num){
  if(!isNaN(num)){
    num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
    num = num.split('').reverse().join('').replace(/^[\.]/,'');
  
  }
    return num;
}

function MaysPrimera(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}