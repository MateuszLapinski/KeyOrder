using KeyOrderAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<KeyOrderContext>(opts =>
    opts.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddCors(opts =>
{
    opts.AddPolicy("AllowReact3002", policy =>
    {
        policy
            .WithOrigins("http://localhost:3002")  
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services
    .AddControllers()
    .AddJsonOptions(o =>
    {
        
        o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
       
        o.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReact3002");
//app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
