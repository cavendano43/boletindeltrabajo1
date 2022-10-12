const moment = require('moment');
moment.locale('es');

const css=`
  .container{
    padding:3rem;
    font-size:10px;
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
  .p-2{
      padding: 0.5rem!important;
  }
  .p-3 {
      padding: 1rem!important;
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
  .mr-3 {
    margin-right: 1rem !important;
  }
  .mr-5 {
    margin-right: 3rem !important;
  }
  .mr-9 {
    margin-right: 6rem !important;
  }
  .mr-10 {
    margin-right: 7rem !important;
  }
  .mr-11 {
    margin-right: 8.5rem !important;
  }
  .mr-20 {
    margin-right: 23rem !important;
  }

  .ml-3 {
    margin-left: 1rem !important;
  }
  .ml-5 {
    margin-left: 3rem !important;
  }
  .ml-9 {
    margin-left: 6rem !important;
  }
  .ml-10 {
    margin-left: 7rem !important;
  }
  .ml-11 {
    margin-left: 8.5rem !important;
  }
  .mñ-20 {
    margin-left: 23rem !important;
  }
  

  .my-5px{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .my-10px{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .mt-100px{
    margin-top:100px;
  }
  .mt-200px{
    margin-top:200px;
  }
  .mb-4 {
    margin-bottom:.75rem;
  }
  .mb-5 {
    margin-bottom:1rem;
  }
  .font-size-13pt {
    font-size: 13pt;
  }
  .font-size-10 {
    font-size:10px;
  }
  .font-size-12 {
    font-size: 12px;
  }
  .font-size-18 {
    font-size: 18px;
  }
  .font-size-20 {
    font-size: 20px;
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
  .w-40{
    width:40%;
  }
  .w-50{
    width:50%;
  }
  .w-60{
    width:60%;
  }
  .d-flex {
    display: -ms-flexbox !important;
    display: flex !important;
  }
  .justify-content-end {
    -ms-flex-pack: end !important;
    justify-content: flex-end !important;
  }
  .justify-content-between {
    -ms-flex-pack: space-beetwen;
    justify-content: space-between;
  }
  .w-100{
    width:100% !important;
  }
  .border-1 {
    border: 1px solid #222;
  }
  .img-fluid {
      max-width: 100%;
      height: auto;
  }
  .max-w-150 {
      max-width: 250px;
  }
  .text-indent-50 {
      text-indent: 50px;
  }
`;

exports.modeloCartaAviso2 = (datos) => {
  const fechaactual=moment().format('LL');
  const fechatermino=moment(datos.datosfechas.fechatermino).format('LL');
  const fechapago=moment(datos.datosfechas.fechapago).format('LL');
  const logo = datos.datospersonales.logo !='' ? `<div class="d-flex"><img class="img-fluid max-w-150" src="${datos.datospersonales.logo}"/></div>` : '';
  const causal = datos.datospersonales.causal;
  const indemnizacion = datos.datosresumen.indemnizacionanioserviciototal !== '0' ? `<p class="text-justify text-indent-50">En cumplimiento de lo dispuesto en el inciso cuarto del artículo 162 del Código del Trabajo es que se viene a señalar que por concepto las indemnizaciones correspondientes se pagaran lo siguientes valores:</p><p class="text-justify">Indemnización por años de servicio $${datos.datosresumen.indemnizacionanioserviciototal}</p>` : '';
  let articulo;
  let inciso =  datos.datospersonales.inciso;
  let titulo = "";
  let fundamento = `<p class="text-justify text-indent-50">Los hechos en que se funda la causal invocada consisten en la ${datos.datospersonales.fundamentodedespido},  lo cual nos obliga a su separación.</p>`;
  if (causal==="Artículo 161 Necesidades de La Empresa" || causal==="Artículo 161 Desahucio"){
    articulo=causal.split(" ",2).join(" ").toLowerCase();
    titulo = 'inciso primero, del Código del Trabajo, esto es, necesidades de la empresa, establecimiento o servicio, derivados de la racionalización o modernización de los mismos, bajas en la productividad, cambios en las condiciones del mercado o de la economía, que hagan necesaria la separación de uno o más trabajadores.';
    //fundamento = '';
  }else{
    articulo=causal.split(" ",4).join(" ").toLowerCase();
    titulo=` del Código del Trabajo, esto es, ${causal.slice(18).toLowerCase()}`;
   
    //fundamento = `<p class="text-justify text-indent-50">Los hechos en que se funda la causal invocada consisten en la ${datos.datospersonales.fundamentodedespido},  lo cual nos obliga a su separación.</p>`;
    if(causal==="Artículo 160 N° 1 Conductas Indebidas de Caracter Grave"){
      titulo+=`, debidamente comprobadas, ${datos.datospersonales.inciso}`;
    }
    if(causal==="Artículo 160 N° 2 Negociaciones del trabajador dentro del giro del negocio"){
      titulo+=`Negociaciones que ejecute el trabajador dentro del giro del negocio y que hubieren sido prohibidas por escrito en el respectivo contrato por el empleador`;
    }
    if(causal==="Artículo 160 N° 3 No concurrencia a labores sin causa justificada"){
      titulo+=`No concurrencia del trabajador a sus labores sin causa justificada durante dos días seguidos,dos lunes en el mes o un total de tres días durante igual período de tiempo; asimismo, la falta injustificada, o sin aviso previo de parte del trabajador que tuviere a su cargo una actividad, faena o máquina cuyo abandono o paralizacíon signifique una perturbacíon grave en la marcha de la obra`;
    }
    if(causal==="Artículo 160 N° 4 Abandono del trabajo por parte del trabajador"){
      titulo+=`, entendiéndose por tal, ${datos.datospersonales.inciso}`;
    }
    if(causal==="Artículo 160 N° 5 Actos que afectan a la seguridad"){
      titulo+=`Actos, omisiones o imprudencias temerarias, que afecten a la seguridad o al funcionamiento del establecimiento, a la seguridad o a la actividad de los trabajadores`;
    }
    if(causal==="Artículo 160 N° 6 Perjuicio material causado intencionalmente"){
      titulo+=`Negociaciones que ejecute el trabajador dentro del giro del negocio y que hubieren sido prohibidas por escrito en el respectivo contrato por el empleador`;
    }
    titulo+=".";
  }
  return `
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
        <h3 class="text-center"><strong>AVISO DE TÉRMINO DE CONTRATO DE TRABAJO</strong></h3>
        <p>SEÑOR:</p>
        <p>${datos.datospersonales.nombretrabajador}</p>
        <p><u>PRESENTE</u></p>
        <div class="d-flex justify-content-end">
          <p>En ${datos.datospersonales.direccion} a ${fechaactual}</p>
        </div>
        <div class="font-size-10">
            <p>Estimado señor:</p>
            <p class="text-justify text-indent-50">Nos permitimos comunicar que, con 30 días de anticipación que a su contrato de trabajo  se le pondrá termino con fecha ${fechatermino}, por la causal del ${articulo}, ${titulo}</p>
            ${fundamento}
            ${indemnizacion}
            <p class="text-justify text-indent-50">Le informo que sus cotizaciones previsionales se encuentran al día, situación que se acredita mediante los certificados / copia de planillas de cotizaciones previsionales correspondientes a su periodo laborado.</p>
            <p class="text-justify text-indent-50">De conformidad a lo establecido por la Dirección del Trabajo en ordinarios N°s 4185/063 de 27.10.2014 y 3866/042 de 07.10.2013, le informo a usted que el finiquito de trabajo y los valores a pago estarán disponibles a partir del día ${fechapago} en las dependencias de la empresa, pudiendo usted acercarse a ellas en dicha fecha para concurrir ante ministro de fe para proceder a la suscripción y ratificación del finiquito y el pago de los valores respectivos.</p>
            <p class="text-justify text-indent-50">Le informo a usted que de acuerdo a lo dispuesto en el artículo 162 del Código del Trabajo, al momento de suscribir el finiquito, si lo estima necesario usted podrá formular la reserva de derechos que estime necesaria.</p>
            <p class="text-justify">Saluda a usted,</p>
        </div>
        <div class="mb-3">
            <p class="text-center">
            <b>${datos.datospersonales.nombrerepresentante}</b>
            </p>
            <p class="text-center">
            <b>${datos.datospersonales.rutrepresentante}</b>
            </p>
        </div>
        
        <div class="border-1 p-3">
            <p class="text-justify"><strong>Nota:</strong> Las formalidades de esta comunicación de término son:</p>
            <p class="text-justify">1.- El Trabajador debe ser notificado personalmente con a lo menos 30 días de anticipación, si no se da el aviso con esa anticipación debe  pagarse la indemnización sustitutiva del aviso previo.</p>
            <p class="text-justify">2.- Se debe notificar a la Inspección del Trabajo dentro del mismo plazo del punto anterior, las comunicaciones a la Inspección deben hacer vía el portal Web de la Dirección del Trabajo.</p>
        </div>
      </div>
    </body>
  </html>
  `;
}
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

      if(causal==="Artículo 160 N° 1 Conductas Indebidas de Caracter Grave"){
        titulocausal+=`, debidamente comprobadas, ${datos.datospersonales.inciso}`;
      }
      if(causal==="Artículo 160 N° 2 Negociaciones del trabajador dentro del giro del negocio"){
        titulocausal+=`Negociaciones que ejecute el trabajador dentro del giro del negocio y que hubieren sido prohibidas por escrito en el respectivo contrato por el empleador`;
      }
      if(causal==="Artículo 160 N° 3 No concurrencia a labores sin causa justificada"){
        titulocausal+=`No concurrencia del trabajador a sus labores sin causa justificada durante dos días seguidos,dos lunes en el mes o un total de tres días durante igual período de tiempo; asimismo, la falta injustificada, o sin aviso previo de parte del trabajador que tuviere a su cargo una actividad, faena o máquina cuyo abandono o paralizacíon signifique una perturbacíon grave en la marcha de la obra`;
      }
      if(causal==="Artículo 160 N° 4 Abandono del trabajo por parte del trabajador"){
        titulocausal+=`, entendiéndose por tal, ${datos.datospersonales.inciso}`;
      }
      if(causal==="Artículo 160 N° 5 Actos que afectan a la seguridad"){
        titulocausal+=`Actos, omisiones o imprudencias temerarias, que afecten a la seguridad o al funcionamiento del establecimiento, a la seguridad o a la actividad de los trabajadores`;
      }
      if(causal==="Artículo 160 N° 6 Perjuicio material causado intencionalmente"){
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

exports.modeloFiniquito2 = (datos)=>{
  const fechaactual=moment().format('LL');
  const fechainicio=moment(datos.datosfechas.fechainicio).format('LL');
  const fechatermino=moment(datos.datosfechas.fechatermino).format('LL');
  const causal=datos.datospersonales.causal;
  const logo = datos.datospersonales.logo !='' ? `<div class="d-flex"><img class="img-fluid max-w-150" src="${datos.datospersonales.logo}"/></div>` : '';
  const clausulaoctavo = datos.datosresumen.selectpensionalimenticia ? 
  `<strong>OCTAVO:</strong> ${datos.datospersonales.nombreempresa} en cumplimiento a lo dispuesto en el artículo 13 de la ley N°
  14.908, declara que respecto de Don ${datos.datospersonales.nombretrabajador} el Tribunal ${datos.datosresumen.nombretribunal} decreto retención de sus remuneraciones por concepto de pensiones alimenticias, obligación de retención que se fue cumplida mensualmente desde que fue notificada la resolución respectiva y que conforme las normas legales vigentes también son descontadas de las sumas que el ex trabajador percibe a la suscripción del presente finiquito, los montos correspondientes a pensiones alimenticias.`
  :
  `<strong>OCTAVO:</strong> ${datos.datospersonales.nombreempresa}. en cumplimiento a lo dispuesto en el artículo 13 de la ley N° 14.908, declara que respecto de Don ${datos.datospersonales.nombretrabajador},  a la fecha de suscripción del presente finiquito no ha sido notificado por ningún Tribunal, en cuanto a que haya decretado la retención de sus remuneraciones monto alguno por concepto de pensiones alimenticias, no existiendo por tanto obligación de retención que se deba cumplir o esté pendiente de cumplimiento, como así tampoco se está obligado a retener de las sumas que el ex trabajador percibe a la suscripción del presente finiquito los montos correspondientes a pensiones alimenticias.`; 
  let articulo = "";
  let titulocausal = "";
  let indemnizacion= "";
  let pension = datos.datosresumen.selectpensionalimenticia ? `
  <div class="row">
    <div class="w-60">
      <p class="my-5px">RETENCIÓN PENSIONES ALIMENTOS</p>
    </div>
    <div class="w-40">
      <p class="my-5px">-($${datos.datosresumen.pensionalimenticia}.-)</p>
    </div>
  </div>`: "";
  if(causal=="Artículo 161 Necesidades de La Empresa" || causal=="Artículo 161 Desahucio"){
    articulo= causal=="Artículo 161 Necesidades de La Empresa" ? `${causal.split(" ",2).join(" ")}, inciso 1°` : `${causal.split(" ",2).join(" ")}, inciso 2°`;
    titulocausal=causal=="Artículo 161 Necesidades de La Empresa" ? `${causal.slice(13)} establecimiento y servicio`:``;
    indemnizacion=`
      <div class="row">
        <div class="w-60">
          <p class="mr-3 my-5px">INDEMNIZACIÓN SUSTITUTIVA DEL AVISO PREVIO</p>
        </div>
        <div class="w-40">
          <p class="my-5px">$${datos.datosresumen.indemnizacionsustitutiva}.-</p>
        </div>
      </div>
      <div class="row">
          <div class="w-60 row">
            <p class="mr-3 my-5px">INDEMNIZACIÓN POR AÑOS DE SERVICIOS</p>
            <p class="my-5px">${datos.datosresumen.indemnizacionanioservicioanios}</p>
          </div>
          <div class="w-40">
            <p class="my-5px">$${datos.datosresumen.indemnizacionanioserviciototal}.-</p>
          </div>
      </div>
      ${pension}
      <div class="row">
          <div class="w-60">
            <p class="my-5px">DESCUENTO APORTE SALDO EMPLEADOR AL SEG. CESANTIA</p>
          </div>
          <div class="w-40">
            <p class="my-5px">-($${datos.datosresumen.descuentoaporteafc}.-)</p>
          </div>
      </div>
    `;
  }else {
    articulo=causal.split(" ",4).join(" ");
    titulocausal=causal.slice(18);
    indemnizacion=`${pension}`;

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

  }

  
  return `<!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Modelo de finiquito</title>
      <style>
        ${css}
      </style>
    </head>
    <body>
  
    <div class="container">
      ${logo}
      <h3 class="text-center">FINIQUITO DE CONTRATO DE TRABAJO</h3>
      <p class="text-justify">
          En Santiago de Chile, a ${fechatermino}, entre <strong><strong>${datos.datospersonales.nombreempresa}</strong></strong>,  Rol Único Tributario N° ${datos.datospersonales.rutempresa}, representada por don ${datos.datospersonales.nombrerepresentante}, cédula nacional de identidad N° ${datos.datospersonales.rutrepresentante}, ambos domiciliados en ${datos.datospersonales.direccion} comuna de ${datos.datospersonales.comunaempresa}, en adelante también el “ex Empleador”; y Don ${datos.datospersonales.nombretrabajador}, cédula nacional de identidad N° ${datos.datospersonales.ruttrabajador}, en adelante también el "ex Trabajadora", en conjunto como las partes, se acuerda el siguiente finiquito:
      </p>
      <p class="text-justify">
          <strong>PRIMERO</strong>: Don ${datos.datospersonales.nombretrabajador}, declara que prestó servicios como ${datos.datospersonales.cargo} para <strong>${datos.datospersonales.nombreempresa}</strong>. desde el ${fechainicio} hasta el ${fechatermino}, fecha en que se puso término al respectivo contrato de trabajo de acuerdo con el ${articulo}, del Código del Trabajo, esto es, por <strong>“${titulocausal}”</strong>.
      </p>
      <p class="text-justify">
          <strong>SEGUNDO:</strong> El ex Trabajador reconoce y acepta que en este acto que <strong>${datos.datospersonales.nombreempresa}</strong>, le ha pagado contra la ratificación y firma del presente finiquito la suma total $${datos.datosresumen.saldoapagar}.-, valor que se pagan en este acto y que recibe a su entera satisfacción, correspondiendo a los siguientes conceptos:
      </p>
      <div class="d-block">
          <div class="row">
              <div class="w-60 row">
                <p class="mr-3 my-5px">FERIADO LEGAL / PROPORCIONAL</p>
                <p class="my-5px">${datos.datosfechas.feriadoproporcional} días</p>
              </div>
              <div class="w-40">
                <p class="ml-3 my-5px">$${datos.datosresumen.feriadoproporcional}.-</p>
              </div>
          </div>
          ${indemnizacion}
          <div class="row">
              <div class="w-60">
                <p class="mr-3 my-5px"><strong>TOTAL A PAGAR</strong></p>
              </div>
              <div class="w-40">
                <p class="my-5px"><strong>$${datos.datosresumen.saldoapagar}.-</strong></p>
              </div>
          </div>
      </div>

      <p class="text-justify">
          Don ${datos.datospersonales.nombretrabajador}, declara haber analizado y estudiado detenidamente dicho detalle, aceptándolo en todas sus partes, sin tener observación alguna que formular. En consecuencia, el ex empleador paga a Don ${datos.datospersonales.nombretrabajador},  mediante transferencia bancaria la suma de $${datos.datosresumen.saldoapagar}.-, quien declara recibir en este acto a su entera satisfacción el monto el monto pagado y acepta los descuentos realizados, no teniendo reclamo alguno que hacer al respecto.
      </p>

      <p class="text-justify">
          <strong>TERCERO:</strong> Don ${datos.datospersonales.nombretrabajador},  expresa en este acto que está totalmente de acuerdo con la causal de término de la relación laboral no teniendo reclamo alguno que hacer respecto de ella y sus fundamentos, dejando además expresa constancia que durante todo el tiempo que prestó servicios a <strong>${datos.datospersonales.nombreempresa}</strong> recibió de ésta, correcta y oportunamente, el pago del total de las remuneraciones convenidas, de acuerdo con su contrato de trabajo, clase de trabajo ejecutado, reajustes legales, pago de asignaciones familiares, horas extraordinarias, feriados legales, gratificaciones legales, contractuales o voluntarias, bonos, participaciones, indemnizaciones legales por terminación del contrato de trabajo, indemnizaciones legales por accidentes del trabajo y/o enfermedades profesionales, indemnización legal por vulneración de derechos fundamentales durante la relación laboral y/o con ocasión del despido y/o a causa de la terminación del contrato de trabajo por cualquiera otro motivo, ya sea que dichas prestaciones e indemnizaciones sean de origen legal o contractual o se hayan generado producto de la aplicación práctica del contrato de trabajo o como cláusula tácita del mismo, como también se deja expresa constancia de que el ex Empleador enteró oportunamente todas y cada una de las cotizaciones previsionales y de salud que corresponden en conformidad a la ley y que se le entregó los comprobantes de dichos pagos, razones por las cuales declara que <strong>${datos.datospersonales.nombreempresa}</strong> nada le adeuda por los conceptos antes indicados ni por ningún otro, sean de origen legal, contractual o extracontractual, derivado de la prestación de sus servicios y/o de la terminación del contrato de trabajo, por lo cual, no teniendo reclamo ni cargo alguno que formular, Don ${datos.datospersonales.nombretrabajador},  le otorga a el más amplio, total y completo finiquito respecto de todas y cada de las obligaciones, prestaciones e indemnizaciones antes indicadas, declaración que formula libre y espontáneamente, en perfecto y cabal conocimiento de todos y cada uno de sus derechos.
      </p>

      <p class="text-justify">
          <strong>CUARTO:</strong> Las partes declaran que el acuerdo que consta en el presente instrumento tiene por objeto precaver entre ellas un eventual litigio, motivo por el cual en este acto y por el presente instrumento Don ${datos.datospersonales.nombretrabajador},  renuncia expresamente al ejercicio de toda acción legal o a la interposición de cualquiera demanda por despido injustificado, indebido o improcedente; despido indirecto; cobro de prestaciones laborales; indemnización de perjuicios por daño moral, lucro cesante y/o daño emergente; indemnización legal por accidente del trabajo y/o enfermedad profesional; indemnización legal por vulneración de derechos fundamentales durante la relación laboral y/o con ocasión del despido y/o a causa de la terminación del contrato de trabajo por cualquiera otro motivo, renunciando, en consecuencia, desde ya, al ejercicio de cualquiera acción o derecho que pudiera corresponderle en contra del ex empleador o en contra de <strong>${datos.datospersonales.nombreempresa}</strong> derivados de la relación laboral que los vinculó y/o de la terminación del contrato de trabajo.
      </p>

      <p class="text-justify">
          <strong>QUINTO:</strong> Don ${datos.datospersonales.nombretrabajador},  reconoce que todo el material escrito o codificado por computador que se manifieste en documentos, diseños de sistemas, discos, cintas, dibujos, informes, especificaciones, datos, memoranda u otro (los "Materiales") que haya realizado o concebido durante su empleo con el ex Empleador, será considerado como trabajos realizados por encargo y todo derecho, titulo e interés en los “Materiales” será de propiedad del ex Empleador.
      </p>

      <p class="text-justify">
          <strong>SEXTO:</strong> Don ${datos.datospersonales.nombretrabajador},  reconoce que, durante la vigencia de su contrato con el ex Empleador, ha conocido y tenido acceso a Información Confidencial, esto es la que consiste en toda la información que no sea generalmente conocida por el público y a la cual haya tenido acceso, conocido u obtenido, por causa de la prestación de los servicios a la empresa de la Trabajador y que sea usada o que pueda ser usada en el negocio del ex Empleador. Incluye, pero no se limita a secretos confidenciales; diseños propietarios de software computacional y configuraciones de hardware; tecnología propietaria; nuevas ideas de productos y servicios; planes comerciales; datos comerciales, de comercio, financieros, investigación y de ventas; listas de clientes, prospectos, vendedores, o personal; información financiera y otra información personal relativa a los clientes y empleados; información confidencial sobre otras compañías y sus productos; e información expresamente denominada como “Propietaria”, “Confidencial” o “Interna”. Toda la Información Confidencial fue compartida a la ex trabajadora dentro de una relación de confianza. Don ${datos.datospersonales.nombretrabajador},  no usará ni divulgará, de manera alguna, ninguna Información Confidencial, como así mismo, no copiará, reproducirá, usará revelará o discutirá en forma alguna, en todo o en parte, la Información Confidencial por un periodo de 3 años de terminada la relación laboral.
          Se deja constancia que Don ${datos.datospersonales.nombretrabajador},  ha entregado al ex Empleador las copias, notas o extractos de Información Confidencial al terminar su contrato, además se obliga a no mantener en su poder, ni entregar a terceras personas, ni divulgar ninguna información que haya recibido, sobre las características internas, procedimientos, métodos de elaboración, negocios, productos, personal, proveedores, clientes, distribuidores, precios, ni cualquier otro dato o antecedente de que se haya enterado con motivo de su relación comercial con el ex Empleador, sea que dichos materiales o información sean o no considerados confidenciales y de propiedad del ex Empleador.            
      </p>

      <p class="text-justify">
          ${clausulaoctavo}
      </p>

      <p class="text-justify">
          <strong>NOVENO:</strong> Las partes declaran que el presente finiquito tiene pleno poder liberatorio respecto de cada una de las materias en el expuestas y que previa lectura y ratificación por parte del Trabajador, se firma el presente finiquito en tres ejemplares, quedando uno de ellos en poder de Don ${datos.datospersonales.nombretrabajador},  otro en poder de ${datos.datospersonales.nombreempresa}, y el tercero en poder del ministro de fe.
      </p>

      <div class="mt-200px">
          <div class="row">
              <div class="col"><strong>EMPLEADOR</strong></div>
              <div class="col text-right"><strong>TRABAJADOR</strong></div>
          </div>
          <div class="row">
              <div class="col"><strong>${datos.datospersonales.nombreempresa}</strong></div>
              <div class="col text-right"><strong>${datos.datospersonales.nombretrabajador}</strong></div>
          </div>
          <div class="row">
              <div class="col"><strong>${datos.datospersonales.rutempresa}</strong></div>
              <div class="col text-right"><strong>${datos.datospersonales.ruttrabajador}</strong></div>
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