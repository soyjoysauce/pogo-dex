$(document).ready(function () {
  let $spriteScreen = $("#sprite-screen");
  let $textBox = $(".text-box");
  let $spriteImg = $(".sprite-img");
  let $statsBox = $(".stats-box");
  let $spriteType = $(".sprite-type");
  let $spriteName = $(".sprite-name");
  let $pokemonData = $(".pokemon-data");
  let $pokeballIcon = $(`<img src="./assets/pokeball.png" alt=""></img>`);
  let xhr = null;

  function clearEntry() {
    let $prevDex = $textBox.children();
    $prevDex.detach();
  }

  function clearSprite() {
    let prevSprite = $spriteImg.children();
    prevSprite.remove();
    let prevName = $spriteName.children();
    prevName.remove();
   
    let $prevText = $pokemonData.children();
    $prevText.remove();
    let $prevStat = $statsBox.children();
    $prevStat.remove();
    let $prevType = $spriteType.children();
    $prevType.remove();
  }

  //Clear Dex
    // $('.clear').on('click', {
    //   clearEntry()
    // });

  $("#openClose").on('click', function () {

    var $frontCover = $(".front-cover");
    $frontCover.toggleClass('flipped');
    $(".inner-cover_btn-box").toggleClass('flipped');
    $('.right-triangle').toggleClass('flipped')
    $(".four-directional").toggleClass('flipped');
    $(".front-inner-cover").toggleClass('visible');
    $(".front-cover_game-controller").toggleClass('visible');

  });

  //Kanto PokeDex
  $('.kanto').on('click', function () {
    clearEntry();
    clearSprite();
    // cancels any outstanding ajax requests
    xhr && xhr.abort();
    // xhr.abort();
    // assign new ajax request to xhr variable
    xhr = $.ajax({
      url: 'https://pokeapi.co/api/v2/pokedex/2/',
      method: 'get',
      dataType: 'text',
      success: function (result) {
        //create a pokeDex array with parsedObj.
        let parsedObj = JSON.parse(result);
        // create newUl
        let $newUl = $('<ul></ul>', {
          class: 'pokemonList',
        });
        parsedObj.pokemon_entries.forEach(function (item) {
          let $newLi = $('<li></li>', {
            class: 'pokemonName',
            entryNum: item.entry_number,
            name: item.pokemon_species.name,
          });
          // attach a click handler when new Li object is created that generates a sprite screen with stats
          $newLi.on('click', function () {
            clearSprite();
            //call api with using the Li objects key name's value
            // https://pokeapi.co/api/v2/pokemon/+name+ number
            xhr && xhr.abort();
            xhr = $.ajax({
              url: 'https://pokeapi.co/api/v2/pokemon/' + item.pokemon_species.name + '/',
              method: 'get',
              dataType: 'text',
              success: function (result) {              
                let parsedObj = JSON.parse(result);
                // debugger;
                // let sprites = parsedObj.sprites;
                
                //append stats for pokemon
                let $spriteStatsText = $('<p>'+ 'Base Stats' +'</p>');
                $statsBox.append($spriteStatsText);
                let pokemonStats = parsedObj.stats;
                pokemonStats.forEach(function (item, index) {
                  item.stats = item.stat.name;
                  item.statNum = item.base_stat;
                  let $statsUl = $('<ul></ul>', {
                    class: 'statsList'
                  });
                  let $newStats = $('<li>' + item.stats + ' : ' + item.statNum + '</li>', {
                    class: 'stats' + index
                  });
                  $statsUl.append($newStats);
                  $statsBox.append($statsUl);
                });
                //create sprite img
                $newLi.spritesImg = parsedObj.sprites;
                let $newImg = $('<img/>', {
                  class: 'pokemonSprite',
                  src: $newLi.spritesImg.front_default
                })
                $spriteImg.append($newImg);

                //create type list container
                let $typeUl = $('<ul></ul>',{
                  class: 'pokemonType'
                });
                let $spriteTypeText = $('<p>'+ 'Type :' +'</p>');
                $spriteType.append($spriteTypeText);
                //create sprite type li
                let pokemonType = parsedObj.types;
                pokemonType.forEach((type)=>{
                  type.name = type.type.name;
                  let $typeLi =$('<li>' + type.name + '</li>');
                  //append list to ul
                  $typeUl.append($typeLi);
                  $spriteType.append($typeUl);
                });
                //create pokemon description container 
                //append to html
                xhr && xhr.abort();
                xhr = $.ajax({
                  url: 'https://pokeapi.co/api/v2/pokemon-species/' + item.pokemon_species.name + '/',
              method: 'get',
              dataType: 'text',
              success: function (result) {
                // debugger; 
                let parsedObj = JSON.parse(result);
                let pokemonText = parsedObj.flavor_text_entries[1].flavor_text;
                let $newData = $('<p>'+pokemonText+'</p>');
                $pokemonData.append($newData);
              }
                });
              //append pokemon name 
              let pokemonName = $('<p>'+ item.pokemon_species.name +'</p>');
              $spriteName.append(pokemonName);
              }
            });
          });
          $newLi.text(item.pokemon_species.name);
          $newUl.append($newLi);
        });
        $textBox.append($newUl[0]);
      }
    });
  });

  //updated-johto pokeDex
  $('.johto').on('click', function () {
    clearEntry();
    clearSprite();
    xhr && xhr.abort();
    xhr = $.ajax({
      url: 'https://pokeapi.co/api/v2/pokedex/7/',
      method: 'get',
      dataType: 'text',
      success: function (result) {
        //create a pokeDex array with parsedObj.
        let parsedObj = JSON.parse(result);
        // create newUl
        let $newUl = $('<ul></ul>', {
          class: 'pokemonList',
        });
        parsedObj.pokemon_entries.forEach(function (item) {
          let $newLi = $('<li></li>', {
            class: 'pokemonName',
            entryNum: item.entry_number,
            name: item.pokemon_species.name,
          });
          // attach a click handler when new Li object is created that generates a sprite screen with stats
          $newLi.on('click', function () {
            clearSprite();
            //call api with using the Li objects key name's value
            // https://pokeapi.co/api/v2/pokemon/+name+ number
            xhr && xhr.abort();
            xhr = $.ajax({
              url: 'https://pokeapi.co/api/v2/pokemon/' + item.pokemon_species.name + '/',
              method: 'get',
              dataType: 'text',
              success: function (result) {              
                let parsedObj = JSON.parse(result);
                // debugger;
                // let sprites = parsedObj.sprites;
                
                //append stats for pokemon
                let $spriteStatsText = $('<p>'+ 'Base Stats' +'</p>');
                $statsBox.append($spriteStatsText);
                let pokemonStats = parsedObj.stats;
                pokemonStats.forEach(function (item, index) {
                  item.stats = item.stat.name;
                  item.statNum = item.base_stat;
                  let $statsUl = $('<ul></ul>', {
                    class: 'statsList'
                  });
                  let $newStats = $('<li>' + item.stats + ' : ' + item.statNum + '</li>', {
                    class: 'stats' + index
                  });
                  $statsUl.append($newStats);
                  $statsBox.append($statsUl);
                });
                //create sprite img
                $newLi.spritesImg = parsedObj.sprites;
                let $newImg = $('<img/>', {
                  class: 'pokemonSprite',
                  src: $newLi.spritesImg.front_default
                })
                $spriteImg.append($newImg);

                //create type list container
                let $typeUl = $('<ul></ul>',{
                  class: 'pokemonType'
                });
                let $spriteTypeText = $('<p>'+ 'Types' +'</p>');
                $spriteType.append($spriteTypeText);
                //create sprite type li
                let pokemonType = parsedObj.types;
                pokemonType.forEach((type)=>{
                  type.name = type.type.name;
                  let $typeLi =$('<li>' + type.name + '</li>');
                  //append list to ul
                  $typeUl.append($typeLi);
                  $spriteType.append($typeUl);
                });
                //create pokemon description container 
                //append to html
                xhr && xhr.abort();
                xhr = $.ajax({
                  url: 'https://pokeapi.co/api/v2/pokemon-species/' + item.pokemon_species.name + '/',
              method: 'get',
              dataType: 'text',
              success: function (result) {
                // debugger; 
                let parsedObj = JSON.parse(result);
                let pokemonText = parsedObj.flavor_text_entries[1].flavor_text;
                let $newData = $('<p>'+pokemonText+'</p>');
                $pokemonData.append($newData);
              }
                });
              //append pokemon name 
              let pokemonName = $('<p>'+ item.pokemon_species.name +'</p>');
              $spriteName.append(pokemonName);
              }
            });
          });
          $newLi.text(item.pokemon_species.name);
          $newUl.append($newLi);
        });
        $textBox.append($newUl[0]);
      }
    });

  });


  //updated-hoenn
  $('.hoenn').on('click', function () {
    clearEntry();
    clearSprite();
    xhr && xhr.abort();
    xhr = $.ajax({
      url: 'https://pokeapi.co/api/v2/pokedex/15/',
      method: 'get',
      dataType: 'text',
      success: function (result) {
        //create a pokeDex array with parsedObj.
        let parsedObj = JSON.parse(result);
        // create newUl
        let $newUl = $('<ul></ul>', {
          class: 'pokemonList',
        });
        parsedObj.pokemon_entries.forEach(function (item) {
          let $newLi = $('<li></li>', {
            class: 'pokemonName',
            entryNum: item.entry_number,
            name: item.pokemon_species.name,
          });
          // attach a click handler when new Li object is created that generates a sprite screen with stats
          $newLi.on('click', function () {
            clearSprite();
            //call api with using the Li objects key name's value
            // https://pokeapi.co/api/v2/pokemon/+name+ number
            xhr && xhr.abort();
            xhr = $.ajax({
              url: 'https://pokeapi.co/api/v2/pokemon/' + item.pokemon_species.name + '/',
              method: 'get',
              dataType: 'text',
              success: function (result) {              
                let parsedObj = JSON.parse(result);
                // debugger;
                // let sprites = parsedObj.sprites;
                
                //append stats for pokemon
                let $spriteStatsText = $('<p>'+ 'Base Stats' +'</p>');
                $statsBox.append($spriteStatsText);
                let pokemonStats = parsedObj.stats;
                pokemonStats.forEach(function (item, index) {
                  item.stats = item.stat.name;
                  item.statNum = item.base_stat;
                  let $statsUl = $('<ul></ul>', {
                    class: 'statsList'
                  });
                  let $newStats = $('<li>' + item.stats + ' : ' + item.statNum + '</li>', {
                    class: 'stats' + index
                  });
                  $statsUl.append($newStats);
                  $statsBox.append($statsUl);
                });
                //create sprite img
                $newLi.spritesImg = parsedObj.sprites;
                let $newImg = $('<img/>', {
                  class: 'pokemonSprite',
                  src: $newLi.spritesImg.front_default
                })
                $spriteImg.append($newImg);

                //create type list container
                let $typeUl = $('<ul></ul>',{
                  class: 'pokemonType'
                });
                let $spriteTypeText = $('<p>'+ 'Types' +'</p>');
                $spriteType.append($spriteTypeText);
                //create sprite type li
                let pokemonType = parsedObj.types;
                pokemonType.forEach((type)=>{
                  type.name = type.type.name;
                  let $typeLi =$('<li>' + type.name + '</li>');
                  //append list to ul
                  $typeUl.append($typeLi);
                  $spriteType.append($typeUl);
                });
                //create pokemon description container 
                //append to html
                xhr && xhr.abort();
                xhr = $.ajax({
                  url: 'https://pokeapi.co/api/v2/pokemon-species/' + item.pokemon_species.name + '/',
              method: 'get',
              dataType: 'text',
              success: function (result) {
                // debugger; 
                let parsedObj = JSON.parse(result);
                let pokemonText = parsedObj.flavor_text_entries[1].flavor_text;
                let $newData = $('<p>'+pokemonText+'</p>');
                $pokemonData.append($newData);
              }
                });
              //append pokemon name 
              let pokemonName = $('<p>'+ item.pokemon_species.name +'</p>');
              $spriteName.append(pokemonName);
              }
            });
          });
          $newLi.text(item.pokemon_species.name);
          $newUl.append($newLi);
        });
        $textBox.append($newUl[0]);
      }
    });
  });


  //extended-sinnoh
  $('.sinnoh').on('click', function () {
    clearEntry();
    clearSprite();
    xhr && xhr.abort();
    xhr = $.ajax({
      url: 'https://pokeapi.co/api/v2/pokedex/6/',
      method: 'get',
      dataType: 'text',
      success: function (result) {
        //create a pokeDex array with parsedObj.
        let parsedObj = JSON.parse(result);
        // create newUl
        let $newUl = $('<ul></ul>', {
          class: 'pokemonList',
        });
        parsedObj.pokemon_entries.forEach(function (item) {
          let $newLi = $('<li></li>', {
            class: 'pokemonName',
            entryNum: item.entry_number,
            name: item.pokemon_species.name,
          });
          // attach a click handler when new Li object is created that generates a sprite screen with stats
          $newLi.on('click', function () {
            clearSprite();
            //call api with using the Li objects key name's value
            // https://pokeapi.co/api/v2/pokemon/+name+ number
            xhr && xhr.abort();
            xhr = $.ajax({
              url: 'https://pokeapi.co/api/v2/pokemon/' + item.pokemon_species.name + '/',
              method: 'get',
              dataType: 'text',
              success: function (result) {              
                let parsedObj = JSON.parse(result);
                // debugger;
                // let sprites = parsedObj.sprites;
                
                //append stats for pokemon
                let $spriteStatsText = $('<p>'+ 'Base Stats' +'</p>');
                $statsBox.append($spriteStatsText);
                let pokemonStats = parsedObj.stats;
                pokemonStats.forEach(function (item, index) {
                  item.stats = item.stat.name;
                  item.statNum = item.base_stat;
                  let $statsUl = $('<ul></ul>', {
                    class: 'statsList'
                  });
                  let $newStats = $('<li>' + item.stats + ' : ' + item.statNum + '</li>', {
                    class: 'stats' + index
                  });
                  $statsUl.append($newStats);
                  $statsBox.append($statsUl);
                });
                //create sprite img
                $newLi.spritesImg = parsedObj.sprites;
                let $newImg = $('<img/>', {
                  class: 'pokemonSprite',
                  src: $newLi.spritesImg.front_default
                })
                $spriteImg.append($newImg);

                //create type list container
                let $typeUl = $('<ul></ul>',{
                  class: 'pokemonType'
                });
                let $spriteTypeText = $('<p>'+ 'Types' +'</p>');
                $spriteType.append($spriteTypeText);
                //create sprite type li
                let pokemonType = parsedObj.types;
                pokemonType.forEach((type)=>{
                  type.name = type.type.name;
                  let $typeLi =$('<li>' + type.name + '</li>');
                  //append list to ul
                  $typeUl.append($typeLi);
                  $spriteType.append($typeUl);
                });
                //create pokemon description container 
                //append to html
                xhr && xhr.abort();
                xhr = $.ajax({
                  url: 'https://pokeapi.co/api/v2/pokemon-species/' + item.pokemon_species.name + '/',
              method: 'get',
              dataType: 'text',
              success: function (result) {
                // debugger; 
                let parsedObj = JSON.parse(result);
                let pokemonText = parsedObj.flavor_text_entries[1].flavor_text;
                let $newData = $('<p>'+pokemonText+'</p>');
                $pokemonData.append($newData);
              }
                });
              //append pokemon name 
              let pokemonName = $('<p>'+ item.pokemon_species.name +'</p>');
              $spriteName.append(pokemonName);
              }
            });
          });
          $newLi.text(item.pokemon_species.name);
          $newUl.append($newLi);
        });
        $textBox.append($newUl[0]);
      }
    });
  });

  //updated-unova
  $('.unova').on('click', function () {
    clearEntry();
    clearSprite();
    xhr && xhr.abort();
    xhr = $.ajax({
      url: 'https://pokeapi.co/api/v2/pokedex/9/',
      method: 'get',
      dataType: 'text',
      success: function (result) {
        //create a pokeDex array with parsedObj.
        let parsedObj = JSON.parse(result);
        // create newUl
        let $newUl = $('<ul></ul>', {
          class: 'pokemonList',
        });
        parsedObj.pokemon_entries.forEach(function (item) {
          let $newLi = $('<li></li>', {
            class: 'pokemonName',
            entryNum: item.entry_number,
            name: item.pokemon_species.name,
          });
          // attach a click handler when new Li object is created that generates a sprite screen with stats
          $newLi.on('click', function () {
            clearSprite();
            //call api with using the Li objects key name's value
            // https://pokeapi.co/api/v2/pokemon/+name+ number
            xhr && xhr.abort();
            xhr = $.ajax({
              url: 'https://pokeapi.co/api/v2/pokemon/' + item.pokemon_species.name + '/',
              method: 'get',
              dataType: 'text',
              success: function (result) {              
                let parsedObj = JSON.parse(result);
                // debugger;
                // let sprites = parsedObj.sprites;
                
                //append stats for pokemon
                let $spriteStatsText = $('<p>'+ 'Base Stats' +'</p>');
                $statsBox.append($spriteStatsText);
                let pokemonStats = parsedObj.stats;
                pokemonStats.forEach(function (item, index) {
                  item.stats = item.stat.name;
                  item.statNum = item.base_stat;
                  let $statsUl = $('<ul></ul>', {
                    class: 'statsList'
                  });
                  let $newStats = $('<li>' + item.stats + ' : ' + item.statNum + '</li>', {
                    class: 'stats' + index
                  });
                  $statsUl.append($newStats);
                  $statsBox.append($statsUl);
                });
                //create sprite img
                $newLi.spritesImg = parsedObj.sprites;
                let $newImg = $('<img/>', {
                  class: 'pokemonSprite',
                  src: $newLi.spritesImg.front_default
                })
                $spriteImg.append($newImg);

                //create type list container
                let $typeUl = $('<ul></ul>',{
                  class: 'pokemonType'
                });
                let $spriteTypeText = $('<p>'+ 'Types' +'</p>');
                $spriteType.append($spriteTypeText);
                //create sprite type li
                let pokemonType = parsedObj.types;
                pokemonType.forEach((type)=>{
                  type.name = type.type.name;
                  let $typeLi =$('<li>' + type.name + '</li>');
                  //append list to ul
                  $typeUl.append($typeLi);
                  $spriteType.append($typeUl);
                });
                //create pokemon description container 
                //append to html
                xhr && xhr.abort();
                xhr = $.ajax({
                  url: 'https://pokeapi.co/api/v2/pokemon-species/' + item.pokemon_species.name + '/',
              method: 'get',
              dataType: 'text',
              success: function (result) {
                // debugger; 
                let parsedObj = JSON.parse(result);
                let pokemonText = parsedObj.flavor_text_entries[1].flavor_text;
                let $newData = $('<p>'+pokemonText+'</p>');
                $pokemonData.append($newData);
              }
                });
              //append pokemon name 
              let pokemonName = $('<p>'+ item.pokemon_species.name +'</p>');
              $spriteName.append(pokemonName);
              }
            });
          });
          $newLi.text(item.pokemon_species.name);
          $newUl.append($newLi);
        });
        $textBox.append($newUl[0]);
      }
    });
  });
});