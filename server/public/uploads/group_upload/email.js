const nodemailer = require('nodemailer')
const {SMTP: {host, port, password, username, SSL}} = require('../../configuration/configuration')
const handlebars = require('handlebars')
const path = require('path')
const fs = require('fs')

const {promisify} = require('util')
const readFile = promisify(fs.readFile)


let transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: false, // true for 465, false for other ports
    auth: {
        user: username, // generated ethereal user
        pass: password, // generated ethereal password
    },

});
const read = async (emailTemplate) => {
    
        let path='./views/email_templates/'+emailTemplate;
        const content = await readFile( path, 'utf-8');
        // console.log("CONTENT",content);
        return content;

}

exports.sendEmail = async(email, emailTemplate, parameters,attachment) => {
    read(emailTemplate)
            .then(content => {
                // console.log("this is email")
                const template = handlebars.compile(content)

                let htmlToSend = template(parameters);
                let info = transporter.sendMail({
                    from: username, // sender address
                    to: email, // sender addressbaz@example.com", // list of receivers
                    subject: "Welcome to Seekrz", // Subject line
                    html: htmlToSend,
                    attachments:attachment
                });
                // console.log("Message sent: %s", info.messageId);
                // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            })

}




exports.sendLabel=async(email,data)=>{

        let info = await transporter.sendMail({
            from: username, // sender address
            to: email, // list of receivers
            subject:"Shipping Label for your recent Trade", // Subject line
            text: `Hello,Thanks for the recent trade you have.Here is your shipping_label document`, // plain text body
            // html:`<p>Click <a href=" ${data.label_url}">here</a></p>`
            attachments:[{
                filename:'shipping_label.pdf',
                contentType:'application/pdf',
                path:`${data.label_url}`
            }]
          });
    
        // console.log("Message sent: %s", info);
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
       
   
};



 