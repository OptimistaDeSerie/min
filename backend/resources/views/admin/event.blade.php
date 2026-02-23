@extends('layouts.admin')

@section('title', 'All Events')

@section('content')
<div class="flex items-center flex-wrap justify-between gap20 mb-27">
    <h3>Events</h3>
    <a class="tf-button style-1 w208" href="{{ route('admin.event.add') }}"><i class="icon-plus"></i> Add new</a>
</div>

<div class="wg-box">
    <div class="wg-table table-all-user">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach($events as $event)
                <tr>
                    <td>{{ $event->title }}</td>
                    <td>{{ $event->event_date }}</td>
                    <td>{{ $event->venue }}</td>
                    <td>
                        <div class="list-icon-function">
                            <a href="{{ route('admin.event.edit',['id'=>$event->id]) }}" class="text-primary"><i class="icon-edit-3"></i></a>
                            <form action="{{ route('admin.event.delete',['id'=>$event->id]) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <div class="item text-danger delete">
                                    <i class="icon-trash-2"></i>
                                </div>
                            </form>
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
@push('scripts')
    <script>
    $(function(){
        $(".delete").on('click',function(e){
            e.preventDefault();
            var selectedForm = $(this).closest('form');
            swal({
                title: "Are you sure?",
                text: "You want to delete this Item? This will also delete all its sizes!",
                type: "warning",
                buttons: ["No!", "Yes!"],
                confirmButtonColor: '#dc3545'
            }).then(function (result) {
                if (result) {
                    selectedForm.submit();  
                }
            });                             
        });
    });
    </script>    
@endpush