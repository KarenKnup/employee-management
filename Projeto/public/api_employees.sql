-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 09/11/2025 às 07:13
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `api_employees`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `childdept`
--

CREATE TABLE `childdept` (
  `childDeptId` int(11) NOT NULL,
  `parentDeptName` longtext NOT NULL,
  `departmentName` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `childdept`
--

INSERT INTO `childdept` (`childDeptId`, `parentDeptName`, `departmentName`) VALUES
(1, '2', 'Desenvolvimento de Software'),
(2, '2', 'Suporte Técnico'),
(3, '1', 'Recrutamento'),
(4, '3', 'Contabilidade'),
(5, '4', 'Mídias Sociais');

-- --------------------------------------------------------

--
-- Estrutura para tabela `dashboardvalues`
--

CREATE TABLE `dashboardvalues` (
  `dashboardId` int(11) NOT NULL,
  `totalEmployee` int(11) NOT NULL,
  `totalLeaves` int(11) NOT NULL,
  `totalNewLeaves` int(11) NOT NULL,
  `totalApprovedLeaves` int(11) NOT NULL,
  `admins` int(11) NOT NULL,
  `totalRejectedLeaves` int(11) NOT NULL,
  `totalEarnedLeaves` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `dashboardvalues`
--

INSERT INTO `dashboardvalues` (`dashboardId`, `totalEmployee`, `totalLeaves`, `totalNewLeaves`, `totalApprovedLeaves`, `admins`, `totalRejectedLeaves`, `totalEarnedLeaves`) VALUES
(1, 6, 5, 1, 3, 0, 0, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `earnedleave`
--

CREATE TABLE `earnedleave` (
  `earnedLeaveId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `totalEarnedLeaves` int(11) NOT NULL,
  `totalSickEarnedLeaves` int(11) NOT NULL,
  `lastUpdatedDate` longtext NOT NULL,
  `employeeName` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `earnedleave`
--

INSERT INTO `earnedleave` (`earnedLeaveId`, `employeeId`, `totalEarnedLeaves`, `totalSickEarnedLeaves`, `lastUpdatedDate`, `employeeName`) VALUES
(1, 1, 20, 5, '2025-10-01', 'Maria Silva'),
(2, 2, 18, 3, '2025-09-15', 'João Pereira'),
(3, 3, 22, 6, '2025-09-25', 'Ana Costa'),
(4, 4, 15, 2, '2025-10-10', 'Carlos Souza'),
(5, 5, 25, 4, '2025-10-20', 'Fernanda Lima');

-- --------------------------------------------------------

--
-- Estrutura para tabela `employee`
--

CREATE TABLE `employee` (
  `employeeId` int(11) NOT NULL,
  `employeeName` longtext NOT NULL,
  `contactNo` longtext NOT NULL,
  `emailId` longtext NOT NULL,
  `deptId` int(11) NOT NULL,
  `password` longtext NOT NULL,
  `gender` longtext NOT NULL,
  `role` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `employee`
--

INSERT INTO `employee` (`employeeId`, `employeeName`, `contactNo`, `emailId`, `deptId`, `password`, `gender`, `role`) VALUES
(1, 'Maria Silva', '2199999999', 'maria.silva@empresa.com', 1, 'maria123', 'Feminino', 'Employee'),
(2, 'João Pereira', '2198888888', 'joao.pereira@empresa.com', 2, 'joao123', 'Masculino', 'Employee'),
(3, 'Ana Costa', '2197777777', 'ana.costa@empresa.com', 1, 'ana123', 'Feminino', 'Employee'),
(4, 'Carlos Souza', '2196666666', 'carlos.souza@empresa.com', 3, 'carlos123', 'Masculino', 'Employee'),
(5, 'Fernanda Lima', '2195555555', 'fernanda.lima@empresa.com', 2, 'fernanda123', 'Feminino', 'Employee'),
(6, 'Rafael Almeida', '2194444444', 'rafael.admin@empresa.com', 1, 'admin123', 'Masculino', 'Admin');

-- --------------------------------------------------------

--
-- Estrutura para tabela `leaverequest`
--

CREATE TABLE `leaverequest` (
  `leaveId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `leaveTypeId` int(11) NOT NULL,
  `startDate` longtext NOT NULL,
  `endDate` longtext NOT NULL,
  `status` longtext NOT NULL,
  `reason` longtext NOT NULL,
  `requestDate` longtext NOT NULL,
  `employeeName` longtext NOT NULL,
  `contactNo` longtext NOT NULL,
  `typeName` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `leaverequest`
--

INSERT INTO `leaverequest` (`leaveId`, `employeeId`, `leaveTypeId`, `startDate`, `endDate`, `status`, `reason`, `requestDate`, `employeeName`, `contactNo`, `typeName`) VALUES
(1, 1, 1, '2025-11-10', '2025-11-20', 'Aprovado', 'Férias anuais', '2025-10-15', 'Maria Silva', '2199999999', 'Férias'),
(2, 2, 2, '2025-10-05', '2025-10-10', 'Aprovado', 'Doença leve', '2025-10-03', 'João Pereira', '2198888888', 'Licença Médica'),
(3, 3, 1, '2025-12-01', '2025-12-15', 'Pendente', 'Viagem familiar', '2025-10-25', 'Ana Costa', '2197777777', 'Férias'),
(4, 4, 5, '2025-10-22', '2025-10-23', 'Rejeitado', 'Compromisso pessoal', '2025-10-20', 'Carlos Souza', '2196666666', 'Ausência Justificada'),
(5, 5, 4, '2025-11-02', '2025-11-05', 'Aprovado', 'Nascimento de filho', '2025-10-25', 'Fernanda Lima', '2195555555', 'Licença Paternidade');

-- --------------------------------------------------------

--
-- Estrutura para tabela `leavetype`
--

CREATE TABLE `leavetype` (
  `leaveTypeId` int(11) NOT NULL,
  `typeName` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `leavetype`
--

INSERT INTO `leavetype` (`leaveTypeId`, `typeName`) VALUES
(1, 'Férias'),
(2, 'Licença Médica'),
(3, 'Licença Maternidade'),
(4, 'Licença Paternidade'),
(5, 'Ausência Justificada');

-- --------------------------------------------------------

--
-- Estrutura para tabela `parentdept`
--

CREATE TABLE `parentdept` (
  `departmentId` int(11) NOT NULL,
  `departmentName` longtext NOT NULL,
  `departmentLogo` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `parentdept`
--

INSERT INTO `parentdept` (`departmentId`, `departmentName`, `departmentLogo`) VALUES
(1, 'Recursos Humanos', 'hr_logo.png'),
(2, 'Tecnologia da Informação', 'it_logo.png'),
(3, 'Finanças', 'finance_logo.png'),
(4, 'Marketing', 'marketing_logo.png'),
(5, 'Operações', 'operations_logo.png');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `childdept`
--
ALTER TABLE `childdept`
  ADD PRIMARY KEY (`childDeptId`);

--
-- Índices de tabela `dashboardvalues`
--
ALTER TABLE `dashboardvalues`
  ADD PRIMARY KEY (`dashboardId`);

--
-- Índices de tabela `earnedleave`
--
ALTER TABLE `earnedleave`
  ADD PRIMARY KEY (`earnedLeaveId`);

--
-- Índices de tabela `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employeeId`);

--
-- Índices de tabela `leaverequest`
--
ALTER TABLE `leaverequest`
  ADD PRIMARY KEY (`leaveId`);

--
-- Índices de tabela `leavetype`
--
ALTER TABLE `leavetype`
  ADD PRIMARY KEY (`leaveTypeId`);

--
-- Índices de tabela `parentdept`
--
ALTER TABLE `parentdept`
  ADD PRIMARY KEY (`departmentId`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `childdept`
--
ALTER TABLE `childdept`
  MODIFY `childDeptId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `dashboardvalues`
--
ALTER TABLE `dashboardvalues`
  MODIFY `dashboardId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `earnedleave`
--
ALTER TABLE `earnedleave`
  MODIFY `earnedLeaveId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `employee`
--
ALTER TABLE `employee`
  MODIFY `employeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `leaverequest`
--
ALTER TABLE `leaverequest`
  MODIFY `leaveId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `leavetype`
--
ALTER TABLE `leavetype`
  MODIFY `leaveTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `parentdept`
--
ALTER TABLE `parentdept`
  MODIFY `departmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
