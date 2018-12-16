update actor
set first_name = 'GROUCHO'
where first_name = 'HARPO' and last_name = 'WILLIAMS';

select first_name
,last_name

from actor

where first_name = 'GROUCHO'