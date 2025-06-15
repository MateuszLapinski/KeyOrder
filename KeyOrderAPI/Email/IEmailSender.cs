namespace KeyOrderAPI.E_mail
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string to, string subject, string htmlBody);

    }
}
