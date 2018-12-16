select staff.first_name
,staff.last_name
,sum(amount)

from sakila.payment
join sakila.staff on payment.staff_id = staff.staff_id

where MONTH(payment.payment_date) = 08 and YEAR(payment.payment_date) = 2005

group by staff.first_name