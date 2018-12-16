select customer.first_name
,customer.last_name
,sum(amount)

from sakila.payment
join sakila.customer on customer.customer_id = payment.customer_id

group by payment.customer_id

order by customer.last_name