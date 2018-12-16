update actor
set first_name = 'HARPO'
where first_name = 'GROUCHO' and last_name = 'WILLIAMS';

select first_name
,last_name

from actor

where last_name = 'WILLIAMS'