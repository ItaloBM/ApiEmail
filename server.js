// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const { dirname } = require('path');
const { fileURLToPath } = require('url');

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/send', upload.array('fotos'), async (req, res) => {
  const { nome, email, endereco, pontoReferencia, descricao, latitude, longitude } = req.body;
  const fotos = req.files;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Relato de Problema',
    html: `
      <!DOCTYPE html>

<html lang="en"xmlns:o="urn:schemas-microsoft-com:office:office"xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
      <title></title>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <link href="https://fonts.googleapis.com/css?family=Roboto"rel="stylesheet"type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"/>
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
        }
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
        p {
          line-height: inherit;
        }
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
        .image_block img + div {
          display: none;
        }
        @media (max-width: 670px) {
          .desktop_hide table.icons-inner,
          .social_block.desktop_hide .social-table {
            display: inline-block !important;
          }
          .icons-inner {
            text-align: center;
          }
          .icons-inner td {
            margin: 0 auto;
          }
          .mobile_hide {
            display: none;
          }
          .row-content {
            width: 100% !important;
          }
          .stack .column {
            width: 100%;
            display: block;
          }
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
      </style>
  </head>

  <body style="background-color: #fff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">

    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;"   width="100%">

      <tbody>
        <tr>
          <td>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%">
              <tbody>
                <tr>
                  <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation"
                      style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5; color: #000000; width: 650px; margin: 0 auto;" width="650">
                      
                      <tbody>
                        <tr>
                          <td class="column column-1" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left;
                              padding-bottom: 15px;
                              padding-top: 20px;
                              vertical-align: middle;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="image_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    width: 100%;
                                    padding-right: 0px;
                                    padding-left: 0px;
                                  "
                                >
                                  <div
                                    align="center"
                                    class="alignment"
                                    style="line-height: 10px"
                                  >
                                <!--Logo-->
                                    <div style="max-width: 195px">
                                      <a href="https://www.instagram.com/streetsecurityprojeto?igsh=MWwwMWRtdXgzYmJ2dA==/" style="outline: none"                                  tabindex="-1" target="_blank"><img alt="Logo" height="auto" src="https://github-production-user-asset-6210df.s3.amazonaws.com/112031013/332991392-f18b8c20-588e-4ff6-b50e-854ffe5f1155.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240612%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240612T024912Z&X-Amz-Expires=300&X-Amz-Signature=2284084f9bfb1c3e541729adf0fde7035c06790dec2e6ac8d16effb9475f936e&X-Amz-SignedHeaders=host&actor_id=112031013&key_id=0&repo_id=804613713" style="display: block;                 height: auto; border: 0; width: 70%; border-radius: 50%;" title="Logo" width="140" title="Logo Street Security" width="140"/>
                                      </a>
                                    </div>

                                  </div>
                                </td>
                              </tr>
                            </table>

                          </td>
                        </tr>
                      </tbody>

                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          
          
            <!--Slogan-->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-3"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #f5f5f5;
                        color: #000000;
                        width: 650px;
                        margin: 0 auto;
                      "
                      width="650"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 10px;
                              padding-top: 10px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #000;
                                      font-family: 'Roboto Slab', Arial,
                                        'Helvetica Neue', Helvetica, sans-serif;
                                      font-size: 20px;
                                      font-weight: 400;
                                      line-height: 120%;
                                      text-align: center;
                                      mso-line-height-alt: 24px;
                                    "
                                  >
                                  <p
                                  style="margin: 0; word-break: break-word; font-size: 18px; font-style: italic;"
                                  >
                                    Construindo o Futuro, Pavimentando sua Segurança.
                                  </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <!--Fim do Slogan-->

            <!--Inicio da Descrição do Problema-->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-4"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #f5f5f5;
                        color: #000000;
                        width: 650px;
                        margin: 0 auto;
                      "
                      width="650"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-left: 20px;
                              padding-right: 20px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="33.333333333333336%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="empty_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div></div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class="column column-2"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-left: 20px;
                              padding-right: 20px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="33.333333333333336%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="image_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    width: 100%;
                                    padding-right: 0px;
                                    padding-left: 0px;
                                  "
                                >
                                  
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class="column column-3"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-left: 20px;
                              padding-right: 20px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="33.333333333333336%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="empty_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div></div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-5"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #f5f5f5;
                        color: #000000;
                        width: 650px;
                        margin: 0 auto;
                      "
                      width="650"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 20px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <div
                              class="spacer_block block-1"
                              style="
                                height: 20px;
                                line-height: 20px;
                                font-size: 1px;
                              "
                            >
                               
                            </div>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #000;
                                      font-family: 'Roboto Slab', Arial,
                                        'Helvetica Neue', Helvetica, sans-serif;
                                      font-size: 20px;
                                      font-weight: 400;
                                      line-height: 120%;
                                      text-align: justify;
                                      mso-line-height-alt: 24px;
                                    "
                                  >
                                  <p style="margin: 0; word-break: break-word; font-size: 18px; text-align: center; font-weight: 700">
                                    Relato do Problema enviado por <br>${nome}
                                  </p>

                                  <br>

                                  <p class="p_titulo_mensagem"
                                    style="margin: 0; word-break: break-word; font-size:18px; text-align: center; font-weight: 700"
                                  >
                                    Endereço:
                                  </p>

                                  <br>

                                  <p
                                    style="margin: 0; word-break: break-word; font-size:15px; text-align: center; font-weight: 700"
                                  >
                                    ${endereco}
                                  </p>

                                  <br>

                                  <p class="p_titulo_mensagem"
                                    style="margin: 0; word-break: break-word; font-size:18px; text-align: center; font-weight: 700"
                                  >
                                    Ponto de Referência:
                                  </p>
                                  <br>
                                  <p
                                    style="margin: 0; word-break: break-word; font-size:15px; text-align: center; font-weight: 700"
                                  >
                                    ${pontoReferencia}
                                  </p>
                                  <br>
                                  <p class="p_titulo_mensagem"
                                    style="margin: 0; word-break: break-word; font-size:18px; text-align: center; font-weight: 700"
                                  >
                                    Descrição do Problema:
                                  </p>
                                  <br>
                                  <p
                                    style="margin: 0; word-break: break-word; font-size:15px; text-align: center; font-weight: 700"
                                  >
                                    ${descricao}
                                  </p>

                                  <br>

                                  <p class="p_titulo_mensagem"
                                    style="margin: 0; word-break: break-word; font-size:18px; text-align: center; font-weight: 700"
                                  >
                                    Fotos da Rua com Problema em Anexo!
                                  </p>

                                  <br>

                                  

                                  <p class="p_titulo_mensagem"
                                    style="margin: 0; word-break: break-word; font-size:18px; text-align: center; font-weight: 700;"
                                  >
                                    Localização no Mapa:
                                  </p>

                                  <br>

                                  <p style="margin: 0; word-break: break-word; font-size:15px; text-align: center; font-weight: 700"><strong>Localização:</strong> <a href="${mapUrl}" target="_blank">Ver no Google Maps</a></p>

                                  
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <!--Fim da Descrição do Problema-->

            
            
            <!--Inicio da Imagem e do sobre nos-->
            
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-9"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="
                         mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; color: #000000; background-color: #f5f5f5; background-image: url('https://cdn.discordapp.com/attachments/591859204311089165/1249177129162248302/rua_sobre.jpg?ex=66665a5c&is=666508dc&hm=ea5880df75fc0169521fa78090ac605acb5cce0e1a8697324ac666d1eb0e060e&'); background-size: cover; background-position: center; width: 650px; margin: 0 auto;  "
                         
                      width="650">
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 40px;
                              padding-left: 30px;
                              padding-right: 30px;
                              padding-top: 40px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 5px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 10px;
                                  "
                                >
                                  <div
                                    style="
                                      color: #ffffff;
                                      font-family: 'Roboto Slab', Arial,
                                        'Helvetica Neue', Helvetica, sans-serif;
                                      font-size: 26px;
                                      font-weight: 400;
                                      line-height: 120%;
                                      text-align: center;
                                      mso-line-height-alt: 31.2px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <span>SOBRE NÓS</span>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #fff;
                                      direction: ltr;
                                      font-family: Poppins, Arial, Helvetica,
                                        sans-serif;
                                      font-size: 12px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: justify;
                                      mso-line-height-alt: 14.399999999999999px;
                                    "
                                  >
                                  <br>

                                  <p style="margin: 0; text-align: justify; text-align: center;; font-weight: 600; color:white;">
                                    Somos uma equipe dedicada a melhorar a infraestrutura urbana através <br> da identificação e relato de problemas nas ruas. 
                                  </p>

                                  <p style="margin: 0; text-align: justify; text-align: center; font-weight: 600; color:white;">
                                    Nosso objetivo é garantir que as vias públicas sejam seguras <br> e bem pavimentadas para todos. 
                                  </p>

                                  <p style="margin: 0; text-align: justify; text-align: center; font-weight: 600; color:white;">
                                    Utilizamos as informações enviadas por cidadãos atentos como <br> você para  notificar as autoridades competentes e acompanhar <br> a resolução dos problemas. 
                                  </p>

                                  <p style="margin: 0; text-align: justify; text-align: center;  font-weight: 600; color:white;">
                                    Juntos, podemos fazer a diferença e tornar <br> nossas cidades lugares melhores para viver. 
                                  </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          
            <!--Fim do sobre nos-->

            <!--Inicio do rodape-->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-10"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row-content stack"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      background: linear-gradient(135deg, #000000, #434343); /* Gradiente de preto para cinza escuro */
                      color: #ffffff; /* Cor do texto branco para contraste */
                      width: 650px;
                      margin: 0 auto;
                    "
                    width="650"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 20px;
                              padding-top: 20px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #f9f9f9;
                                      font-family: Poppins, Arial, Helvetica,
                                        sans-serif;
                                      font-size: 14px;
                                      font-weight: 400;
                                      line-height: 120%;
                                      text-align: center;
                                      mso-line-height-alt: 16.8px;
                                    "
                                  >
                                  <p
                                  style="margin: 0; word-break: break-word"
                                >
                                Contato:
                                Email: projetointstreet@gmail.com
                                <br>
                                Telefone: (XX) XXXX-XXXX
                                <br>
                                Endereço: Rua Halfeld 1179, Juiz de Fora, MG, 36016-000
                                </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="divider_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div align="center" class="alignment">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="65%"
                                    >
                                      <tr>
                                        <td
                                          class="divider_inner"
                                          style="
                                            font-size: 1px;
                                            line-height: 1px;
                                            border-top: 1px solid #9098a7;
                                          "
                                        >
                                          <span> </span>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="social_block block-3"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 10px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 15px;
                                    text-align: center;
                                  "
                                >
                                  <div align="center" class="alignment">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="social-table"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        display: inline-block;
                                      "
                                      width="126px"
                                    >
                                      <tr>
                                        
                                        
                                        <td style="padding: 0 5px 0 5px">
                                          <a
                                            href="https://www.instagram.com/streetsecurityprojeto?igsh=MWwwMWRtdXgzYmJ2dA==/"
                                            target="_blank"
                                            ><img
                                              alt="Instagram"
                                              height="auto"
                                              src="https://cdn.discordapp.com/attachments/591859204311089165/1249190969459609602/logotipo-do-instagram.png?ex=6666673f&is=666515bf&hm=c3b7bbc54388f16f8b7ddef8166a1deba0395647c6a81ebf410a4c0d26d95454&"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                              title="Instagram"
                                              width="25"
                                          /></a>
                                        </td>
                                        <td style="padding: 0 5px 0 5px">
                                         
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-11"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #ffffff;
              "
              width="100%"
            >
              
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End -->
  </body>
</html>
    `,
    attachments: fotos.map(foto => ({
      filename: foto.originalname,
      content: foto.buffer,
      cid: foto.filename
    }))
  };

  transporter.sendMail(mailOptions)
    .then(info => {
      res.send(info);
    })
    .catch(error => {
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`Servidor Rodando http://localhost:${port}`);
});

