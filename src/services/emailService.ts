import fs from "node:fs/promises";
import path from "node:path";

import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { config } from "../configs/config";

class EmailService {
    private transporter: Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.EMAIL_USER,
                pass: config.EMAIL_PASSWORD,
            },
        });
    }
    public async sendEmail(
        to: string,
        subject: string,
        templateName: string,
        context: Record<string, any>,
    ): Promise<void> {
        await this.transporter.sendMail({
            to,
            subject,
            text: "hello from node emailer",
            html: await this._renderTemplate(templateName, context),
        });
    }
    private async _renderTemplate(
        templateName: string,
        context: Record<string, any>,
    ): Promise<string> {
        const layoutSource = await fs.readFile(
            path.join(process.cwd(), "src", "templates", "base.hbs"),
            "utf-8",
        );
        const layoutTemplate = handlebars.compile(layoutSource);
        const templateSource = await fs.readFile(
            path.join(process.cwd(), "src", "templates", `${templateName}.hbs`),
            "utf8",
        );
        const childTemplate = handlebars.compile(templateSource);
        const childHTML = childTemplate(context);
        return layoutTemplate({ ...context, body: childHTML });
    }
}
export const emailService = new EmailService();
