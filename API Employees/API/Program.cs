using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200") // endereço do Angular
                  .AllowAnyHeader()
                  .AllowAnyMethod(); // permite GET/POST/PUT/DELETE
        });
});


// Configure MySQL connection
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors("AllowAngular");


using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated(); // cria o banco automaticamente se não existir
}


// Call the data initialization method after app has started
app.Lifetime.ApplicationStarted.Register(() => Task.Run(async () => await InitializeDataAsync(app)).Wait());

app.Run();

async Task InitializeDataAsync(WebApplication app)
{
    using (var scope = app.Services.CreateScope())
    {
        var httpClient = new HttpClient();

        string employeesUrl = "https://localhost:7266/api/Employee";
        string childDeptUrl = "https://localhost:7266/api/ChildDept";
        string earnedLeaveUrl = "https://localhost:7266/api/EarnedLeave";
        string leaveRequestUrl = "https://localhost:7266/api/LeaveRequest";
        string leaveTypeUrl = "https://localhost:7266/api/LeaveType";
        string parentDeptUrl = "https://localhost:7266/api/ParentDept";
        string dashboardUrl = "https://localhost:7266/api/Dashboard";

        try
        {
            Console.WriteLine("Verificando se a API está respondendo...");

            // Verifica se a API está respondendo
            var employeesResponse = await httpClient.GetAsync(employeesUrl);
            employeesResponse.EnsureSuccessStatusCode();

            // Load and insert Employees data
            Console.WriteLine("Carregando dados de Employees...");
            var employeesJson = await System.IO.File.ReadAllTextAsync("employee.json");
            var employees = JsonConvert.DeserializeObject<List<Employee>>(employeesJson);

            foreach (var produto in employees)
            {
                var response = await httpClient.PostAsync(employeesUrl,
                    new StringContent(JsonConvert.SerializeObject(produto), Encoding.UTF8, "application/json"));

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Employee {produto.employeeName} inserido com sucesso.");
                }
                else
                {
                    Console.WriteLine($"Falha ao inserir o Employee {produto.employeeName}: {response.ReasonPhrase}");
                }
            }

            // === CHILD DEPT ===
            Console.WriteLine("Verificando se a API ChildDept está respondendo...");
            var childDeptResponse = await httpClient.GetAsync(childDeptUrl);
            childDeptResponse.EnsureSuccessStatusCode();

            Console.WriteLine("Carregando dados de ChildDept...");
            var childDeptJson = await System.IO.File.ReadAllTextAsync("childdept.json");
            var childDepts = JsonConvert.DeserializeObject<List<ChildDept>>(childDeptJson);

            foreach (var dept in childDepts)
            {
                var response = await httpClient.PostAsync(childDeptUrl,
                    new StringContent(JsonConvert.SerializeObject(dept), Encoding.UTF8, "application/json"));

                if (response.IsSuccessStatusCode)
                    Console.WriteLine($"ChildDept {dept.departmentName} inserido com sucesso.");
                else
                    Console.WriteLine($"Falha ao inserir ChildDept {dept.departmentName}: {response.ReasonPhrase}");
            }

            // === EARNED LEAVE ===
            Console.WriteLine("Verificando se a API EarnedLeave está respondendo...");
            var earnedLeaveResponse = await httpClient.GetAsync(earnedLeaveUrl);
            earnedLeaveResponse.EnsureSuccessStatusCode();

            Console.WriteLine("Carregando dados de EarnedLeave...");
            var earnedLeaveJson = await System.IO.File.ReadAllTextAsync("earnedleave.json");
            var earnedLeaves = JsonConvert.DeserializeObject<List<EarnedLeave>>(earnedLeaveJson);

            foreach (var el in earnedLeaves)
            {
                var response = await httpClient.PostAsync(earnedLeaveUrl,
                    new StringContent(JsonConvert.SerializeObject(el), Encoding.UTF8, "application/json"));

                if (response.IsSuccessStatusCode)
                    Console.WriteLine($"EarnedLeave do funcionário {el.employeeName} inserido com sucesso.");
                else
                    Console.WriteLine($"Falha ao inserir EarnedLeave do funcionário {el.employeeName}: {response.ReasonPhrase}");
            }

            // === LEAVE REQUEST ===
            Console.WriteLine("Verificando se a API LeaveRequest está respondendo...");
            var leaveRequestResponse = await httpClient.GetAsync(leaveRequestUrl);
            leaveRequestResponse.EnsureSuccessStatusCode();

            Console.WriteLine("Carregando dados de LeaveRequest...");
            var leaveRequestJson = await System.IO.File.ReadAllTextAsync("leaverequest.json");
            var leaveRequests = JsonConvert.DeserializeObject<List<LeaveRequest>>(leaveRequestJson);

            foreach (var lr in leaveRequests)
            {
                var response = await httpClient.PostAsync(leaveRequestUrl,
                    new StringContent(JsonConvert.SerializeObject(lr), Encoding.UTF8, "application/json"));

                if (response.IsSuccessStatusCode)
                    Console.WriteLine($"LeaveRequest de {lr.employeeName} inserido com sucesso.");
                else
                    Console.WriteLine($"Falha ao inserir LeaveRequest de {lr.employeeName}: {response.ReasonPhrase}");
            }

            // === LEAVE TYPE ===
            Console.WriteLine("Verificando se a API LeaveType está respondendo...");
            var leaveTypeResponse = await httpClient.GetAsync(leaveTypeUrl);
            leaveTypeResponse.EnsureSuccessStatusCode();

            Console.WriteLine("Carregando dados de LeaveType...");
            var leaveTypeJson = await System.IO.File.ReadAllTextAsync("leavetype.json");
            var leaveTypes = JsonConvert.DeserializeObject<List<LeaveType>>(leaveTypeJson);

            foreach (var lt in leaveTypes)
            {
                var response = await httpClient.PostAsync(leaveTypeUrl,
                    new StringContent(JsonConvert.SerializeObject(lt), Encoding.UTF8, "application/json"));

                if (response.IsSuccessStatusCode)
                    Console.WriteLine($"LeaveType {lt.typeName} inserido com sucesso.");
                else
                    Console.WriteLine($"Falha ao inserir LeaveType {lt.typeName}: {response.ReasonPhrase}");
            }

            // === PARENT DEPT ===
            Console.WriteLine("Verificando se a API ParentDept está respondendo...");
            var parentDeptResponse = await httpClient.GetAsync(parentDeptUrl);
            parentDeptResponse.EnsureSuccessStatusCode();

            Console.WriteLine("Carregando dados de ParentDept...");
            var parentDeptJson = await System.IO.File.ReadAllTextAsync("parentdept.json");
            var parentDepts = JsonConvert.DeserializeObject<List<ParentDept>>(parentDeptJson);

            foreach (var dept in parentDepts)
            {
                var response = await httpClient.PostAsync(parentDeptUrl,
                    new StringContent(JsonConvert.SerializeObject(dept), Encoding.UTF8, "application/json"));

                if (response.IsSuccessStatusCode)
                    Console.WriteLine($"ParentDept {dept.departmentName} inserido com sucesso.");
                else
                    Console.WriteLine($"Falha ao inserir ParentDept {dept.departmentName}: {response.ReasonPhrase}");
            }

            // === DASHBOARD ===
            Console.WriteLine("Verificando se a API Dashboard está respondendo...");
            var dashboardResponse = await httpClient.GetAsync(dashboardUrl);
            dashboardResponse.EnsureSuccessStatusCode();

            Console.WriteLine("Carregando dados de Dashboard...");
            var dashboardJson = await System.IO.File.ReadAllTextAsync("dashboard.json");
            var dashboards = JsonConvert.DeserializeObject<List<ParentDept>>(parentDeptJson);

            foreach (var dash in dashboards)
            {
                var response = await httpClient.PostAsync(dashboardUrl,
                    new StringContent(JsonConvert.SerializeObject(dash), Encoding.UTF8, "application/json"));

                if (response.IsSuccessStatusCode)
                    Console.WriteLine($"Dashboard inserido com sucesso.");
                else
                    Console.WriteLine($"Falha ao inserir Dashboard: {response.ReasonPhrase}");
            }



        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"Erro ao se comunicar com a API: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro inesperado: {ex.Message}");
        }
    }
}
