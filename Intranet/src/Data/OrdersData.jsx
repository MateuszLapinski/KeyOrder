
const OrdersData = [
    {
        id: "#2833",
        client: "John McCormick",
        value: "$35.00",
        date: "09 Aug 2023",
        status: "Dispatch",
        statusColor: "info",
        details: {
            address: "1956 Wiseman Street, CALMA, IA 53122",
            paymentMethod: "Credit Card",
            itemsCount: 3,
            notes: ""
        }
    },
    {
        id: "#8652",
        client: "Brooklyn Zoe",
        value: "$54.00",
        date: "30 Jul 2023",
        status: "Pending",
        statusColor: "secondary",
        details: {
            address: "302 Snider Street, RUTLAND, VT 05701",
            paymentMethod: "PayPal",
            itemsCount: 2,
            notes: ""
        }
    },
    {
        id: "#1023",
        client: "Emma Watson",
        value: "$120.00",
        date: "02 Sep 2023",
        status: "Completed",
        statusColor: "success",
        details: {
            address: "12 Pine Ave, ORLANDO, FL 32801",
            paymentMethod: "Credit Card",
            itemsCount: 5,
            notes: "Delivered on time"
        }
    },
    {
        id: "#1048",
        client: "Liam Smith",
        value: "$78.90",
        date: "12 Sep 2023",
        status: "Cancelled",
        statusColor: "danger",
        details: {
            address: "451 Maple Road, NASHVILLE, TN 37211",
            paymentMethod: "Bank Transfer",
            itemsCount: 4,
            notes: "Customer canceled"
        }
    },
    {
        id: "#1050",
        client: "Ava Johnson",
        value: "$260.00",
        date: "14 Sep 2023",
        status: "Pending",
        statusColor: "secondary",
        details: {
            address: "88 Ocean Blvd, MIAMI, FL 33101",
            paymentMethod: "PayPal",
            itemsCount: 8,
            notes: ""
        }
    },
    {
        id: "#1066",
        client: "Noah Wilson",
        value: "$95.50",
        date: "15 Sep 2023",
        status: "Dispatch",
        statusColor: "info",
        details: {
            address: "77 Forest Dr, BOSTON, MA 02115",
            paymentMethod: "Credit Card",
            itemsCount: 3,
            notes: ""
        }
    },
    {
        id: "#1071",
        client: "Sophia Davis",
        value: "$430.00",
        date: "18 Sep 2023",
        status: "Completed",
        statusColor: "success",
        details: {
            address: "303 Bay St, CHARLESTON, SC 29401",
            paymentMethod: "Credit Card",
            itemsCount: 10,
            notes: ""
        }
    },
    {
        id: "#1082",
        client: "James Miller",
        value: "$10.99",
        date: "20 Sep 2023",
        status: "Pending",
        statusColor: "secondary",
        details: {
            address: "63 Sunset Blvd, LOS ANGELES, CA 90001",
            paymentMethod: "Apple Pay",
            itemsCount: 1,
            notes: "Awaiting confirmation"
        }
    },
    {
        id: "#1087",
        client: "Isabella Moore",
        value: "$300.00",
        date: "22 Sep 2023",
        status: "Dispatch",
        statusColor: "info",
        details: {
            address: "11 Grand Ave, DALLAS, TX 75001",
            paymentMethod: "Credit Card",
            itemsCount: 6,
            notes: ""
        }
    },
    {
        id: "#1090",
        client: "Benjamin Taylor",
        value: "$85.75",
        date: "24 Sep 2023",
        status: "Cancelled",
        statusColor: "danger",
        details: {
            address: "245 River Rd, AUSTIN, TX 73301",
            paymentMethod: "PayPal",
            itemsCount: 2,
            notes: "Payment failed"
        }
    },
    {
        id: "#1099",
        client: "Mia Anderson",
        value: "$48.25",
        date: "25 Sep 2023",
        status: "Completed",
        statusColor: "success",
        details: {
            address: "400 Main St, PHOENIX, AZ 85001",
            paymentMethod: "Bank Transfer",
            itemsCount: 2,
            notes: ""
        }
    },
    {
        id: "#1103",
        client: "Oliver Thomas",
        value: "$105.00",
        date: "26 Sep 2023",
        status: "Dispatch",
        statusColor: "info",
        details: {
            address: "91 Elm St, PORTLAND, ME 04101",
            paymentMethod: "Credit Card",
            itemsCount: 4,
            notes: "Fragile items"
        }
    },
    {
        id: "#1109",
        client: "Charlotte White",
        value: "$220.00",
        date: "27 Sep 2023",
        status: "Pending",
        statusColor: "secondary",
        details: {
            address: "63 Willow Rd, SEATTLE, WA 98101",
            paymentMethod: "Credit Card",
            itemsCount: 7,
            notes: "Express delivery requested"
        }
    },
    {
        id: "#1114",
        client: "William Harris",
        value: "$77.77",
        date: "28 Sep 2023",
        status: "Dispatch",
        statusColor: "info",
        details: {
            address: "47 Oak Ln, DENVER, CO 80201",
            paymentMethod: "PayPal",
            itemsCount: 3,
            notes: ""
        }
    },
    {
        id: "#1121",
        client: "Amelia Martin",
        value: "$99.00",
        date: "29 Sep 2023",
        status: "Completed",
        statusColor: "success",
        details: {
            address: "123 Lake Dr, MINNEAPOLIS, MN 55401",
            paymentMethod: "Credit Card",
            itemsCount: 4,
            notes: "Reviewed positively"
        }
    },
    {
        id: "#1129",
        client: "Elijah Clark",
        value: "$300.00",
        date: "30 Sep 2023",
        status: "Pending",
        statusColor: "secondary",
        details: {
            address: "97 Ivy Rd, ATLANTA, GA 30301",
            paymentMethod: "Bank Transfer",
            itemsCount: 6,
            notes: ""
        }
    },
    {
        id: "#1134",
        client: "Harper Lewis",
        value: "$45.50",
        date: "01 Oct 2023",
        status: "Cancelled",
        statusColor: "danger",
        details: {
            address: "87 Maple Ave, TULSA, OK 74101",
            paymentMethod: "PayPal",
            itemsCount: 2,
            notes: "Client no longer needs the items"
        }
    },
    {
        id: "#1140",
        client: "Lucas Hall",
        value: "$180.00",
        date: "02 Oct 2023",
        status: "Dispatch",
        statusColor: "info",
        details: {
            address: "35 Birch St, CHICAGO, IL 60601",
            paymentMethod: "Credit Card",
            itemsCount: 5,
            notes: ""
        }
    },
    {
        id: "#1146",
        client: "Evelyn Young",
        value: "$68.00",
        date: "03 Oct 2023",
        status: "Completed",
        statusColor: "success",
        details: {
            address: "901 Coral Ave, BOISE, ID 83701",
            paymentMethod: "Credit Card",
            itemsCount: 3,
            notes: ""
        }
    },
    {
        id: "#1151",
        client: "Henry King",
        value: "$127.00",
        date: "04 Oct 2023",
        status: "Pending",
        statusColor: "secondary",
        details: {
            address: "211 Pacific Blvd, SAN DIEGO, CA 92101",
            paymentMethod: "Bank Transfer",
            itemsCount: 5,
            notes: "Awaiting shipment confirmation"
        }
    }
];

export default OrdersData;
