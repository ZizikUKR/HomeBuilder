﻿USE [homebuilder]
GO

/****** Object:  Table [dbo].[FoodCategories]    Script Date: 5/5/2021 3:45:30 PM ******/
SET ANSI_NULLS ON
GO  

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FoodCategories](
	[Id] [uniqueidentifier] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_FoodCategories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


