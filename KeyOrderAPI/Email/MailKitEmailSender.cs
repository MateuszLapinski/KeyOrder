using KeyOrderAPI.E_mail;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;


public class MailKitEmailSender : IEmailSender
{
    private readonly SmtpSettings _smtp;

    public MailKitEmailSender(IOptions<SmtpSettings> smtpOptions)
    {
        _smtp = smtpOptions.Value;
    }

    public async Task SendEmailAsync(string to, string subject, string htmlBody)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_smtp.FromName, _smtp.FromEmail));
        message.To.Add(MailboxAddress.Parse(to));
        message.Subject = subject;

        // Możesz też użyć TextPart("plain") lub Multipart dla załączników
        message.Body = new TextPart("html") { Text = htmlBody };

        using var client = new SmtpClient();
        // ustawienie timeoutu, logowanie, itp. wg potrzeb
        await client.ConnectAsync(_smtp.Host, _smtp.Port, _smtp.UseSsl ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(_smtp.User, _smtp.Pass);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}
