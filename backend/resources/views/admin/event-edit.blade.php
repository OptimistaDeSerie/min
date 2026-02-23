@extends('layouts.admin')

@section('content')
<div class="main-content-inner">
    <div class="main-content-wrap">
        <div class="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>Edit Event</h3>
            <ul class="breadcrumbs flex items-center flex-wrap justify-start gap10">
                <li>
                    <a href="{{ url('/admin') }}"><div class="text-tiny">Dashboard</div></a>
                </li>
                <li><i class="icon-chevron-right"></i></li>
                <li>
                    <a href="{{ route('admin.events') }}"><div class="text-tiny">Events</div></a>
                </li>
                <li><i class="icon-chevron-right"></i></li>
                <li><div class="text-tiny">Edit Event</div></li>
            </ul>
        </div>

        <form class="tf-section-2 form-add-product" method="POST" enctype="multipart/form-data" action="{{ route('admin.event.update') }}">
            @csrf
            <input type="hidden" name="id" value="{{ $event->id }}">
            
            <div class="wg-box">
                @if (session('status'))
                    <div class="alert alert-success mb-20">
                        {{ session('status') }}
                    </div>
                @endif
                @if (session('error'))
                    <div class="alert alert-danger mb-20">
                        {{ session('error') }}
                    </div>
                @endif

                <!-- Title -->
                <fieldset>
                    <div class="body-title mb-10">Event Title <span class="tf-color-1">*</span></div>
                    <input class="mb-10" type="text" name="title" placeholder="Enter event title" value="{{ old('title', $event->title) }}" required>
                </fieldset>
                @error("title") <span class="alert alert-danger">{{$message}}</span> @enderror

                <!-- Slug -->
                <fieldset>
                    <div class="body-title mb-10">Slug</div>
                    <input class="mb-10" type="text" name="slug" placeholder="Auto generated" value="{{ old('slug', $event->slug) }}" required>
                </fieldset>
                @error("slug") <span class="alert alert-danger">{{$message}}</span> @enderror

                <!-- Venue & Date -->
                <div class="gap22 cols">
                    <fieldset>
                        <div class="body-title mb-10">Venue</div>
                        <input type="text" name="venue" placeholder="Enter event venue" value="{{ old('venue', $event->venue) }}" required>
                    </fieldset>
                    <fieldset>
                        <div class="body-title mb-10">Event Date</div>
                        <input type="date" name="event_date" value="{{ old('event_date', $event->event_date) }}" required>
                    </fieldset>
                </div>

                <!-- Description -->
                <fieldset>
                    <div class="body-title mb-10">Full Description <span class="tf-color-1">*</span></div>
                    <textarea class="mb-10" name="description" placeholder="Full description">{{ old('description', $event->description) }}</textarea>
                </fieldset>
                @error("description") <span class="alert alert-danger">{{$message}}</span> @enderror
            </div>

            <!-- IMAGES -->
            <div class="wg-box">
                <!-- FEATURE IMAGE -->
                <fieldset>
                    <div class="body-title">Feature Image</div>
                    <div class="upload-image flex-grow">
                        @if($event->feature_image)
                            <div class="item" id="featurePreview">
                                <img src="{{$event->feature_image}}" class="effect8" alt="">
                                
                            </div>
                        @else
                            <div class="item" id="featurePreview" style="display:none">
                                <img src="{{asset('uploads/events/preview.JPG')}}" class="effect8" alt="">
                            </div>
                        @endif
                        <div id="upload-file" class="item up-load">
                            <label class="uploadfile">
                                <span class="icon"><i class="icon-upload-cloud"></i></span>
                                <span class="body-text">
                                    Drop feature image here or 
                                    <span class="tf-color">click to browse</span>
                                </span>
                                <input type="file" id="featureImage" name="feature_image" accept="image/*">
                            </label>
                        </div>
                    </div>
                </fieldset>
                @error("feature_image") <span class="alert alert-danger">{{$message}}</span> @enderror

                <!-- GALLERY IMAGES -->
                <fieldset>
                    <div class="body-title mb-10">Upload Gallery Images (Optional)</div>
                    <div class="upload-image mb-16">                           
                        @if($event->eventImages && $event->eventImages->count() > 0)
                            @foreach($event->eventImages as $img)
                                <div class="item gitems">
                                    <img src="{{ $img->image_path }}" class="effect8" alt="">
                                </div>
                            @endforeach
                        @endif
                        <div id="galleryUpload" class="item up-load">
                            <label class="uploadfile" for="galleryImages">
                                <span class="icon">
                                    <i class="icon-upload-cloud"></i>
                                </span>
                                <span class="text-tiny">
                                    Drop your images here or select 
                                    <span class="tf-color">click to browse</span>
                                </span>
                                <input type="file" id="galleryImages" name="images[]" accept="image/*" multiple>
                            </label>
                        </div>
                    </div>                        
                </fieldset>
                @error("images") <span class="alert alert-danger">{{$message}}</span> @enderror

                <div class="cols gap10">
                    <button class="tf-button w-full" type="submit">
                        Update Event
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
@endsection

@push("scripts")
<script>
$(function(){
    // FEATURE IMAGE PREVIEW
    $("#featureImage").on("change", function(){
        const [file] = this.files;
        if(file){
            $("#featurePreview img").attr('src', URL.createObjectURL(file));
            $("#featurePreview").show();
        }
    });

    // GALLERY PREVIEW
    $("#galleryImages").on("change", function(){
        $(".gitems").remove();
        $.each(this.files, function(key, val){
            $("#galleryUpload").prepend(
                `<div class="item gitems">
                    <img src="${URL.createObjectURL(val)}" alt="">
                </div>`
            );
        });
    });

    // AUTO SLUG
    $("input[name='title']").on("input", function(){
        $("input[name='slug']").val(StringToSlug($(this).val()));
    });
});

function StringToSlug(Text) {
    return Text.toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
}
</script>
@endpush