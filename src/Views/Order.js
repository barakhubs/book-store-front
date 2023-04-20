import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrderList = () => {
    const navigate = useNavigate();
    const [orders, setOrder] = useState([]);
    const [error, setError] = useState(null);
    // You can set the currently logged-in user ID in state
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const getOrders = async () => {
            try {
                
                const response = await fetch(`http://localhost/api/order/index.php?user=${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await response.json();
                setOrder(data);
            } catch (error) {
                setError(error.message);
            }
        };

        getOrders();
    }, []);

    const calculateSubtotal = () => {
        let total = 0;
        orders.forEach((order) => {
            total += Number(order.order_price) * order.quantity;
        });
        return total;
    }

    async function removeFromOrder(orderId) {
        const confirmed = window.confirm('Are you sure you want to remove this item from your order?');
        if (!confirmed) {
            return; // If user cancels the removal, do nothing
        }
        const token = localStorage.getItem('token');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost/api/order/delete.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Use backticks for string interpolation
                },
                body: JSON.stringify({
                    id: orderId
                }),
            });
            if (response.ok) {
                alert("Order removed from order successfully!");
                window.location.reload();
            } else {
                throw new Error('Failed to remove order from order');
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    
    async function removeFromOrder(orderId) {
        const confirmed = window.confirm('Confirm your order');
        if (!confirmed) {
            return; // If user cancels the removal, do nothing
        }
        const token = localStorage.getItem('token');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost/api/order/delete.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Use backticks for string interpolation
                },
                body: JSON.stringify({
                    id: orderId
                }),
            });
            if (response.ok) {
                alert("Order removed from order successfully!");
                window.location.reload();
            } else {
                throw new Error('Failed to remove order from order');
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    if (localStorage.getItem('token')) {
        if (orders.length > 0) {
            return (
                <div class="bg-white p-8 rounded-md w-full">
	<div>
		<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
			<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
				<table class="min-w-full leading-normal">
					<thead>
						<tr>
							<th
								class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Name
							</th>
							<th
								class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								products
							</th>
							<th
								class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Created at
							</th>
							<th
								class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								QRT
							</th>
							<th
								class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Status
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<div class="flex items-center">
									<div class="flex-shrink-0 w-10 h-10">
										<img class="w-full h-full rounded-full"
											src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
											alt="" />
									</div>
									<div class="ml-3">
										<p class="text-gray-900 whitespace-no-wrap">
											Vera Carpenter
										</p>
									</div>
								</div>
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<p class="text-gray-900 whitespace-no-wrap">Admin</p>
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<p class="text-gray-900 whitespace-no-wrap">
									Jan 21, 2020
								</p>
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<p class="text-gray-900 whitespace-no-wrap">
									43
								</p>
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<span
									class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
									<span aria-hidden
										class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
									<span class="relative">Activo</span>
								</span>
							</td>
						</tr>
						<tr>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<div class="flex items-center">
									<div class="flex-shrink-0 w-10 h-10">
										<img class="w-full h-full rounded-full"
											src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
											alt="" />
									</div>
									<div class="ml-3">
										<p class="text-gray-900 whitespace-no-wrap">
											Blake Bowman
										</p>
									</div>
								</div>
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<p class="text-gray-900 whitespace-no-wrap">Editor</p>
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<p class="text-gray-900 whitespace-no-wrap">
									Jan 01, 2020
								</p>
                                </td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<p class="text-gray-900 whitespace-no-wrap">
									77
								</p>
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<span
									class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
									<span aria-hidden
										class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
									<span class="relative">Activo</span>
								</span>
							</td>
						</tr>
						<tr>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<div class="flex items-center">
									<div class="flex-shrink-0 w-10 h-10">
										<img class="w-full h-full rounded-full"
											src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
											alt="" />
									</div>
									<div class="ml-3">
										<p class="text-gray-900 whitespace-no-wrap">
											Dana Moore
										</p>
									</div>
								</div>
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<p class="text-gray-900 whitespace-no-wrap">Editor</p>
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<p class="text-gray-900 whitespace-no-wrap">
									Jan 10, 2020
								</p>
                                </td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<p class="text-gray-900 whitespace-no-wrap">
									64
								</p>
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<span
									class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
									<span aria-hidden
										class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
									<span class="relative">Suspended</span>
								</span>
							</td>
						</tr>
						<tr>
							<td class="px-5 py-5 bg-white text-sm">
								<div class="flex items-center">
									<div class="flex-shrink-0 w-10 h-10">
										<img class="w-full h-full rounded-full"
											src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
											alt="" />
									</div>
									<div class="ml-3">
										<p class="text-gray-900 whitespace-no-wrap">
											Alonzo Cox
										</p>
									</div>
								</div>
							</td>
							<td class="px-5 py-5 bg-white text-sm">
								<p class="text-gray-900 whitespace-no-wrap">Admin</p>
							</td>
							<td class="px-5 py-5 bg-white text-sm">
								<p class="text-gray-900 whitespace-no-wrap">Jan 18, 2020</p>
							</td>
							<td class="px-5 py-5 bg-white text-sm">
								<p class="text-gray-900 whitespace-no-wrap">70</p>
							</td>
							<td class="px-5 py-5 bg-white text-sm">
								<span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
									<span aria-hidden
										class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
									<span class="relative">Inactive</span>
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
            );
        } else {
            return (
                <div class="items-center justify-center p-12">
                    <div class="flex h-full flex-col bg-white shadow-xl">
                        <div class="flex-1 px-4 py-6 sm:px-6">
                            <div class="flex items-start justify-between">
                                <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">No item in order</h2>
                            </div>
                        </div>
                    </div>
                </div>
            ); 
        }
    } else {
        navigate('/login')
        return null 
    }
};

export default OrderList;