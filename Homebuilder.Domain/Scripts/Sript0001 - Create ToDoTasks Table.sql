
--CREATE TABLE public.ToDoTasks
--(
--    Id BIGSERIAL NOT NULL PRIMARY KEY,
--    CreationDate  timestamp DEFAULT current_timestamp,
--    State smallint NOT NULL,
--    ToDo text NULL,
--    Description text NULL,
--    Information text NULL,
--	IsComppleted boolean NOT NULL
--);
USE [homebuilder]
GO

/****** Object:  Table [dbo].[ToDoTask]    Script Date: 11/26/2020 6:35:00 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ToDoTasks](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[ToDo] [nvarchar](250) NULL,
	[Description] [nvarchar](1000) NULL,
	[Information] [nvarchar](500) NULL,
	[IsComppleted] [bit] NOT NULL,
	[State] [int] NOT NULL,
 CONSTRAINT [PK_ToDoTask] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO