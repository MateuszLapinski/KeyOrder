const InvoicesData = [
    {
        id: "INV-1001",
        client: "NutriTech Labs",
        date: "2023-08-10",
        dueDate: "2023-08-25",
        amount: "$1,200.00",
        status: "Paid",
        statusColor: "success",
        details: {
            paymentMethod: "Credit Card",
            invoiceType: "Proforma",
            notes: ""
        }
    },
    {
        id: "INV-1002",
        client: "BioFood Systems",
        date: "2023-08-15",
        dueDate: "2023-08-30",
        amount: "$2,500.00",
        status: "Pending",
        statusColor: "warning",
        details: {
            paymentMethod: "Bank Transfer",
            invoiceType: "Final",
            notes: "Awaiting payment confirmation"
        }
    },
    {
        id: "INV-1003",
        client: "FlavorFormulas Inc.",
        date: "2023-08-18",
        dueDate: "2023-09-01",
        amount: "$980.00",
        status: "Overdue",
        statusColor: "danger",
        details: {
            paymentMethod: "PayPal",
            invoiceType: "Final",
            notes: "Reminder sent"
        }
    },
    {
        id: "INV-1004",
        client: "AromaTech",
        date: "2023-09-01",
        dueDate: "2023-09-15",
        amount: "$1,875.00",
        status: "Paid",
        statusColor: "success",
        details: {
            paymentMethod: "Credit Card",
            invoiceType: "Proforma",
            notes: ""
        }
    },
    {
        id: "INV-1005",
        client: "ZymeFood Science",
        date: "2023-09-05",
        dueDate: "2023-09-20",
        amount: "$3,400.00",
        status: "Pending",
        statusColor: "warning",
        details: {
            paymentMethod: "Bank Transfer",
            invoiceType: "Final",
            notes: ""
        }
    }
];

export default InvoicesData;
