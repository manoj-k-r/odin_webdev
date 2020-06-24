    <html>
    <head>
        <title>Thank You</title>
    </head>
    <body>
        <h1>Thanks <%= name %> for attending the conference. Here is a list of legislators in your area</h1>
        <table>
            <% if legislators.kind_of?(Array) %>
            <th>Name</th><th>Website</th>
            <% legislators.each do |legislator| %>
            <tr>
                <td><% #{legislator.name} %></td>
                <td><% #{legislator.urls.join} unless legislators.url.nil? %></td>
            </tr>
            <% end %>
            <% else %>
            <th></th>
            <td><%= "#{legislators}" %></td>
            <% end %>
        </table>
    </body>
    </html> }