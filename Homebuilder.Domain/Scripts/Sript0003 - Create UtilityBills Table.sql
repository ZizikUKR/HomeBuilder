USE [homebuilder]
GO

/****** Object:  Table [dbo].[UtilityBills]    Script Date: 5/4/2021 11:41:59 AM ******/
SET ANSI_NULLS ON
GO  

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UtilityBills](
	[Id] [uniqueIdentifier] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[Month] [int] NOT NULL,
	[Year] [int] NOT NULL,
	[Name] [int] NOT NULL,
 CONSTRAINT [PK_UtilityBills] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO