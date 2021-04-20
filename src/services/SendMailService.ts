import mail from 'nodemailer';
import AppError from '../errors/AppError';

interface Request {
    name: string;
    message: string;
    email?: string;
}

class SendMaiLService {
    public async execute({ name, message, email }: Request): Promise<void> {
        if(!name) {
            throw new AppError('Missing name Property');
        }

        if(!message) {
            throw new AppError('Missing message property');
        }

        // const transport = mail.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: `${process.env.EMAIL}`,
        //         pass: `${process.env.PASSWORD}`
        //     }
        // });

        // const mailOptions = {
        //     from: 'Bkp Sana 1 <bkpsana1@gmail.com>',
        //     to: 'bkpsana1@gmail.com',
        //     subject: 'Personal Site Message',
        //     text: `Name: ${name}, ${email && `Email: ${email}`}
        //            Message: ${message}`
        // };

        // transport.sendMail(mailOptions, (error, info) => {
        //     try {
        //         throw new Error(`${error}`);
        //     } catch (err) {
        //         throw new Error(err);
        //     }
        // });
        console.log(name, message, email);
    }
}

export default SendMaiLService;
