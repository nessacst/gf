const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail');

async function sendCreateUser(to) {
  try {
    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Conta criada no Leiame',
      text: `Conta criada com sucesso.\n\nAcesse o aplicativo para gerenciar o cadastro de livros.`,
      html: `<h1>Conta criada com sucesso.</h1><p>Acesse o aplicativo para gerenciar o cadastro de novos livros.</p>`,
    });

    console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { sendCreateUser };
