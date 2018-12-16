select `name`
,sum(payment.amount) 'gross revenue'
from sakila.category
join sakila.film_category on category.category_id = film_category.category_id
join sakila.inventory on film_category.film_id = inventory.film_id
join sakila.rental on inventory.inventory_id = rental.inventory_id
join sakila.payment on payment.rental_id = rental.rental_id

group by `name`

order by `gross revenue` desc limit 5